package com.minsat.hlr;

import com.minsat.config.HlrProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class HlrService {

    private static final Logger log = LoggerFactory.getLogger(HlrService.class);

    private static final Pattern ODBIC   = Pattern.compile("ODBIC\\s*=\\s*(\\w+)");
    private static final Pattern ODBOC   = Pattern.compile("ODBOC\\s*=\\s*(\\w+)");
    private static final Pattern ODBROAM = Pattern.compile("ODBROAM\\s*=\\s*(\\w+)");
    private static final Pattern ODBSS   = Pattern.compile("ODBSS\\s*=\\s*(\\w+)");

    private final HlrProperties props;

    public HlrService(HlrProperties props) {
        this.props = props;
    }

    public Map<String, Object> getHlrStatus(String msisdn) {
        try (Socket socket = new Socket(props.getHost(), props.getPort())) {
            socket.setSoTimeout(props.getTimeoutMs());

            OutputStream out = socket.getOutputStream();
            InputStream  in  = socket.getInputStream();

            // login
            sendLine(out, props.getLoginCmd());
            sleep(500);
            readAvailable(in); // discard login banner

            // query
            sendLine(out, "LST ODBDAT: ISDN=\"" + msisdn + "\";");
            sleep(1000);
            String response = readAvailable(in);

            log.debug("HLR response for {}: {}", msisdn, response);

            String odbic   = extract(ODBIC,   response, "UNKNOWN");
            String odboc   = extract(ODBOC,   response, "UNKNOWN");
            String odbroam = extract(ODBROAM, response, "UNKNOWN");
            String odbss   = extract(ODBSS,   response, "UNKNOWN");

            boolean barred = !odbic.equals("NOBIC")
                          || !odboc.equals("NOBOC")
                          || !odbroam.equals("NOBAR")
                          || odbss.equalsIgnoreCase("TRUE");

            Map<String, Object> result = new LinkedHashMap<>();
            result.put("msisdn", msisdn);
            result.put("odbic",   odbic);
            result.put("odboc",   odboc);
            result.put("odbroam", odbroam);
            result.put("odbss",   odbss);
            result.put("barred",  barred);
            return result;

        } catch (Exception e) {
            log.error("HLR Telnet error for {}: {}", msisdn, e.getMessage());
            Map<String, Object> err = new LinkedHashMap<>();
            err.put("msisdn", msisdn);
            err.put("error", "HLR Telnet error: " + e.getMessage());
            return err;
        }
    }

    private void sendLine(OutputStream out, String cmd) throws IOException {
        out.write((cmd + "\r\n").getBytes(StandardCharsets.US_ASCII));
        out.flush();
    }

    private String readAvailable(InputStream in) throws IOException {
        StringBuilder sb = new StringBuilder();
        byte[] buf = new byte[4096];
        int read;
        try {
            while (in.available() > 0 && (read = in.read(buf)) != -1) {
                sb.append(new String(buf, 0, read, StandardCharsets.US_ASCII));
            }
        } catch (IOException ignored) {}
        return sb.toString();
    }

    private String extract(Pattern p, String text, String fallback) {
        Matcher m = p.matcher(text);
        return m.find() ? m.group(1) : fallback;
    }

    private void sleep(long ms) {
        try { Thread.sleep(ms); } catch (InterruptedException ie) { Thread.currentThread().interrupt(); }
    }
}
