package com.minsat.air.ucip;

import com.minsat.air.model.AirResponse;
import com.minsat.air.transport.AirTransport;
import com.minsat.air.transport.AirTransportException;
import com.minsat.air.xml.XmlHelper;
import com.minsat.air.xml.XmlParser;
import com.minsat.config.AirConfig;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GetAccountDetails {

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public GetAccountDetails(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    /**
     * @param subscriberNumber MSISDN
     * @param includeLocation  if true, requests location info via requestLocationInformationFlag
     */
    public AirResponse execute(String subscriberNumber, boolean includeLocation) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");

        String txnId = UUID.randomUUID().toString();
        StringBuilder members = new StringBuilder();
        members.append(XmlHelper.mandatoryMembers(config, txnId));
        members.append(XmlHelper.member("subscriberNumber", subscriberNumber));
        if (includeLocation) {
            members.append("<member><name>requestedInformationFlags</name><value><struct>\n");
            members.append(XmlHelper.memberBool("requestLocationInformationFlag", true));
            members.append("</struct></value></member>\n");
        }
        String xml = XmlHelper.wrapMethodCall("GetAccountDetails", members.toString());
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "GetAccountDetails"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
