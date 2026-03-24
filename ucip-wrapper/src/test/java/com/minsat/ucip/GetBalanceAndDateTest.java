package com.minsat.ucip;

import com.minsat.air.model.AirResponse;
import com.minsat.air.transport.AirTransport;
import com.minsat.air.transport.AirTransportException;
import com.minsat.air.ucip.GetBalanceAndDate;
import com.minsat.air.xml.XmlParser;
import com.minsat.config.AirConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GetBalanceAndDateTest {

    @Mock
    private AirTransport airTransport;

    private GetBalanceAndDate service;

    private static final String SUCCESS_XML = """
        <?xml version="1.0"?>
        <methodResponse>
          <params>
            <param>
              <value>
                <struct>
                  <member>
                    <name>responseCode</name>
                    <value><int>0</int></value>
                  </member>
                  <member>
                    <name>accountValue</name>
                    <value><string>50000</string></value>
                  </member>
                  <member>
                    <name>temporaryBlockedFlag</name>
                    <value><boolean>0</boolean></value>
                  </member>
                </struct>
              </value>
            </param>
          </params>
        </methodResponse>
        """;

    @BeforeEach
    void setUp() {
        AirConfig config = new AirConfig();
        config.setNodeType("EXT");
        config.setHostName("minsat");
        config.setDebug(false);

        XmlParser xmlParser = new XmlParser();
        service = new GetBalanceAndDate(config, airTransport, xmlParser);
    }

    @Test
    void returnsSuccessOnValidResponse() {
        when(airTransport.send(anyString(), anyString())).thenReturn(SUCCESS_XML);

        AirResponse response = service.execute("21369000001");

        assertThat(response.success()).isTrue();
        assertThat(response.responseCode()).isEqualTo(0);
        assertThat(response.data()).containsKey("accountValue");
    }

    @Test
    void throwsOnMissingSubscriberNumber() {
        assertThatThrownBy(() -> service.execute(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("subscriberNumber");

        assertThatThrownBy(() -> service.execute("  "))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("subscriberNumber");
    }

    @Test
    void returnsNetworkErrorOnTransportException() {
        when(airTransport.send(anyString(), anyString()))
                .thenThrow(new AirTransportException("Timeout after 10000ms"));

        AirResponse response = service.execute("21369000001");

        assertThat(response.success()).isFalse();
        assertThat(response.responseCode()).isEqualTo(-1);
        assertThat(response.responseMessage()).contains("Network error");
    }

    @Test
    void returnsFailureForNonZeroResponseCode() {
        String errorXml = """
            <?xml version="1.0"?>
            <methodResponse>
              <params>
                <param>
                  <value>
                    <struct>
                      <member>
                        <name>responseCode</name>
                        <value><int>102</int></value>
                      </member>
                    </struct>
                  </value>
                </param>
              </params>
            </methodResponse>
            """;

        when(airTransport.send(anyString(), anyString())).thenReturn(errorXml);

        AirResponse response = service.execute("21369000001");

        assertThat(response.success()).isFalse();
        assertThat(response.responseCode()).isEqualTo(102);
    }

    @Test
    void requestXmlContainsMandatoryFields() {
        when(airTransport.send(anyString(), anyString())).thenReturn(SUCCESS_XML);
        service.execute("21669000001");

        // Verify the XML sent to transport contains required fields
        org.mockito.ArgumentCaptor<String> xmlCaptor = org.mockito.ArgumentCaptor.forClass(String.class);
        org.mockito.Mockito.verify(airTransport).send(xmlCaptor.capture(), anyString());

        String sentXml = xmlCaptor.getValue();
        assertThat(sentXml).contains("<methodName>GetBalanceAndDate</methodName>");
        assertThat(sentXml).contains("<name>originNodeType</name>");
        assertThat(sentXml).contains("<name>subscriberNumber</name>");
        assertThat(sentXml).contains("21669000001");
    }
}
