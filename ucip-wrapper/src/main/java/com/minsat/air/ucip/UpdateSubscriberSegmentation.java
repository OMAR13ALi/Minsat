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
public class UpdateSubscriberSegmentation {

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public UpdateSubscriberSegmentation(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    public AirResponse execute(String subscriberNumber, int accountGroupId) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");

        String txnId = UUID.randomUUID().toString();
        String members = XmlHelper.mandatoryMembers(config, txnId)
                       + XmlHelper.member("subscriberNumber", subscriberNumber)
                       + XmlHelper.memberInt("accountGroupID", accountGroupId);
        String xml = XmlHelper.wrapMethodCall("UpdateSubscriberSegmentation", members);
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "UpdateSubscriberSegmentation"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
