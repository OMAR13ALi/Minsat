package com.minsat.air.acip;

import com.minsat.air.model.AirResponse;
import com.minsat.air.transport.AirTransport;
import com.minsat.air.transport.AirTransportException;
import com.minsat.air.xml.XmlHelper;
import com.minsat.air.xml.XmlParser;
import com.minsat.config.AirConfig;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GetPromotionPlans {

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public GetPromotionPlans(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    /**
     * @param subscriberNumber MSISDN (required)
     * @param originOperatorId optional
     */
    public AirResponse execute(String subscriberNumber, String originOperatorId) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");

        String txnId = UUID.randomUUID().toString();
        StringBuilder members = new StringBuilder();
        members.append(XmlHelper.mandatoryMembers(config, txnId));
        members.append(XmlHelper.member("subscriberNumber", subscriberNumber));
        if (originOperatorId != null && !originOperatorId.isBlank())
            members.append(XmlHelper.member("originOperatorID", originOperatorId));

        String xml = XmlHelper.wrapMethodCall("GetPromotionPlans", members.toString());
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "GetPromotionPlans"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
