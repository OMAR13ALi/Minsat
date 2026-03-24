package com.minsat.air.xml;

import com.minsat.config.AirConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests XmlHelper static utility methods.
 * Renamed from XmlBuilderTest after refactor to hardcoded-per-method XML building.
 */
class XmlBuilderTest {

    private AirConfig config;

    @BeforeEach
    void setUp() {
        config = new AirConfig();
        config.setNodeType("EXT");
        config.setHostName("minsat");
    }

    @Test
    void mandatoryMembersContainsAllFourFields() {
        String txnId = "test-txn-001";
        String members = XmlHelper.mandatoryMembers(config, txnId);

        assertThat(members).contains("<name>originNodeType</name>");
        assertThat(members).contains("<string>EXT</string>");
        assertThat(members).contains("<name>originHostName</name>");
        assertThat(members).contains("<string>minsat</string>");
        assertThat(members).contains("<name>originTransactionID</name>");
        assertThat(members).contains("<string>test-txn-001</string>");
        assertThat(members).contains("<name>originTimeStamp</name>");
        assertThat(members).contains("<dateTime.iso8601>");
    }

    @Test
    void wrapMethodCallProducesValidEnvelope() {
        String xml = XmlHelper.wrapMethodCall("GetBalanceAndDate",
                XmlHelper.member("subscriberNumber", "21369000001"));

        assertThat(xml).contains("<?xml version=\"1.0\"?>");
        assertThat(xml).contains("<methodName>GetBalanceAndDate</methodName>");
        assertThat(xml).contains("<name>subscriberNumber</name>");
        assertThat(xml).contains("<string>21369000001</string>");
    }

    @Test
    void memberIntProducesIntTag() {
        String m = XmlHelper.memberInt("serviceClassNew", 201);
        assertThat(m).contains("<name>serviceClassNew</name>");
        assertThat(m).contains("<int>201</int>");
    }

    @Test
    void memberBoolTrueProducesOne() {
        assertThat(XmlHelper.memberBool("temporaryBlockedFlag", true))
                .contains("<boolean>1</boolean>");
    }

    @Test
    void memberBoolFalseProducesZero() {
        assertThat(XmlHelper.memberBool("temporaryBlockedFlag", false))
                .contains("<boolean>0</boolean>");
    }

    @Test
    void memberDateProducesDateTimeTag() {
        String m = XmlHelper.memberDate("supervisionExpiryDate", "20240101T000000+0000");
        assertThat(m).contains("<dateTime.iso8601>20240101T000000+0000</dateTime.iso8601>");
    }

    @Test
    void escapeHandlesXmlSpecialChars() {
        assertThat(XmlHelper.escape("a & b < c > d")).isEqualTo("a &amp; b &lt; c &gt; d");
    }

    @Test
    void escapeHandlesNullSafely() {
        assertThat(XmlHelper.escape(null)).isEqualTo("");
    }
}
