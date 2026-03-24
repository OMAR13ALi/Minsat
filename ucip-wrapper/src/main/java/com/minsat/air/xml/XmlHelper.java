package com.minsat.air.xml;

import com.minsat.air.util.DateUtils;
import com.minsat.config.AirConfig;

import java.util.UUID;

/**
 * Static helpers for building AIR XML-RPC requests.
 * Each method builds its own XML — this utility provides common building blocks.
 */
public class XmlHelper {

    private XmlHelper() {}

    /**
     * Returns the 4 mandatory origin members + a fresh txnId.
     * The txnId is stored externally (passed in) for correlation.
     */
    public static String mandatoryMembers(AirConfig config, String txnId) {
        String ts = DateUtils.toAirDateNow();
        return member("originNodeType", config.getNodeType())
             + member("originHostName", config.getHostName())
             + memberRaw("originTransactionID", "<string>" + escape(txnId) + "</string>")
             + memberRaw("originTimeStamp", "<dateTime.iso8601>" + ts + "</dateTime.iso8601>");
    }

    /** String member: &lt;member&gt;&lt;name&gt;key&lt;/name&gt;&lt;value&gt;&lt;string&gt;val&lt;/string&gt;&lt;/value&gt;&lt;/member&gt; */
    public static String member(String name, String value) {
        return "<member><name>" + name + "</name><value><string>" + escape(value) + "</string></value></member>\n";
    }

    /** Integer member */
    public static String memberInt(String name, int value) {
        return "<member><name>" + name + "</name><value><int>" + value + "</int></value></member>\n";
    }

    /** Boolean member — AIR uses 1/0 */
    public static String memberBool(String name, boolean value) {
        return "<member><name>" + name + "</name><value><boolean>" + (value ? "1" : "0") + "</boolean></value></member>\n";
    }

    /** dateTime.iso8601 member — value must already be in AIR format */
    public static String memberDate(String name, String airDate) {
        return "<member><name>" + name + "</name><value><dateTime.iso8601>" + airDate + "</dateTime.iso8601></value></member>\n";
    }

    /** Wraps a pre-built members string in the methodCall envelope */
    public static String wrapMethodCall(String methodName, String members) {
        return "<?xml version=\"1.0\"?>\n"
             + "<methodCall>\n"
             + "  <methodName>" + methodName + "</methodName>\n"
             + "  <params><param><value><struct>\n"
             + members
             + "  </struct></value></param></params>\n"
             + "</methodCall>";
    }

    /** XML-escape a string value */
    public static String escape(String s) {
        if (s == null) return "";
        return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }

    // ---- internal helper ----

    private static String memberRaw(String name, String valueXml) {
        return "<member><name>" + name + "</name><value>" + valueXml + "</value></member>\n";
    }
}
