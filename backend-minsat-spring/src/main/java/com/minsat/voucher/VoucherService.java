package com.minsat.voucher;

import com.minsat.config.VoucherProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.*;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class VoucherService {

    private static final Logger log = LoggerFactory.getLogger(VoucherService.class);

    private final RestTemplate restTemplate;
    private final VoucherProperties props;

    public VoucherService(RestTemplate restTemplate, VoucherProperties props) {
        this.restTemplate = restTemplate;
        this.props = props;
    }

    public Map<String, Object> getBySerialNumber(String serialNumber) {
        return getVoucherDetails(serialNumber, "serialNumber");
    }

    public Map<String, Object> getByActivationCode(String activationCode) {
        return getVoucherDetails(activationCode, "activationCode");
    }

    private Map<String, Object> getVoucherDetails(String lookupValue, String lookupType) {
        String xml = """
                <?xml version="1.0" encoding="UTF-8"?>
                <methodCall>
                  <methodName>GetVoucherDetails</methodName>
                  <params>
                    <param>
                      <value>
                        <struct>
                          <member>
                            <name>%s</name>
                            <value><string>%s</string></value>
                          </member>
                        </struct>
                      </value>
                    </param>
                  </params>
                </methodCall>
                """.formatted(escape(lookupType), escape(lookupValue));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_XML);
        headers.set(HttpHeaders.ACCEPT, MediaType.TEXT_XML_VALUE);
        headers.set(HttpHeaders.AUTHORIZATION, props.getAuth());
        headers.set(HttpHeaders.USER_AGENT, "ADM/2.4/7.0");

        HttpEntity<String> entity = new HttpEntity<>(xml, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    props.getUrl(), HttpMethod.POST, entity, String.class);
            return parseResponse(response.getBody());
        } catch (Exception e) {
            log.error("VoucherAdmin error for {} {}: {}", lookupType, lookupValue, e.getMessage());
            Map<String, Object> err = new LinkedHashMap<>();
            err.put("error", "VoucherAdmin error: " + e.getMessage());
            return err;
        }
    }

    private Map<String, Object> parseResponse(String xmlBody) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.parse(new InputSource(new StringReader(xmlBody)));

        NodeList members = doc.getElementsByTagName("member");
        Map<String, Object> result = new LinkedHashMap<>();

        for (int i = 0; i < members.getLength(); i++) {
            Element member = (Element) members.item(i);
            String name  = textOf(member, "name");
            String value = memberValue(member);
            result.put(name, value != null ? value : "N/A");
        }
        return result;
    }

    private String memberValue(Element member) {
        NodeList values = member.getElementsByTagName("value");
        if (values.getLength() == 0) return null;
        Element value = (Element) values.item(0);
        // try known type tags
        for (String tag : new String[]{"string", "i4", "int", "boolean", "dateTime.iso8601"}) {
            NodeList typed = value.getElementsByTagName(tag);
            if (typed.getLength() > 0) {
                return typed.item(0).getTextContent().trim();
            }
        }
        return value.getTextContent().trim();
    }

    private String textOf(Element parent, String tag) {
        NodeList list = parent.getElementsByTagName(tag);
        return list.getLength() > 0 ? list.item(0).getTextContent().trim() : "";
    }

    private String escape(String s) {
        if (s == null) return "";
        return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }
}
