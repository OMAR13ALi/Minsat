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
public class UpdateTemporaryBlocked {

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public UpdateTemporaryBlocked(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    public AirResponse execute(String subscriberNumber, boolean blocked) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");

        String txnId = UUID.randomUUID().toString();
        String members = XmlHelper.mandatoryMembers(config, txnId)
                       + XmlHelper.member("subscriberNumber", subscriberNumber)
                       + XmlHelper.memberBool("temporaryBlockedFlag", blocked);
        String xml = XmlHelper.wrapMethodCall("UpdateTemporaryBlocked", members);
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "UpdateTemporaryBlocked"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
