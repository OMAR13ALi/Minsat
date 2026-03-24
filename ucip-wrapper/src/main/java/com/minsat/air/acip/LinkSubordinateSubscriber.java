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
public class LinkSubordinateSubscriber {

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public LinkSubordinateSubscriber(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    public AirResponse execute(String subscriberNumber, String masterAccountNumber) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");
        if (masterAccountNumber == null || masterAccountNumber.isBlank())
            throw new IllegalArgumentException("masterAccountNumber is required");
        if (subscriberNumber.equals(masterAccountNumber))
            throw new IllegalArgumentException("subscriberNumber and masterAccountNumber must be different");

        String txnId = UUID.randomUUID().toString();
        String members = XmlHelper.mandatoryMembers(config, txnId)
                       + XmlHelper.member("subscriberNumber", subscriberNumber)
                       + XmlHelper.member("masterAccountNumber", masterAccountNumber);
        String xml = XmlHelper.wrapMethodCall("LinkSubordinateSubscriber", members);
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "LinkSubordinateSubscriber"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
