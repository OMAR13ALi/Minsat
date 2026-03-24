package com.minsat.air.acip;

import com.minsat.air.model.AirResponse;
import com.minsat.air.transport.AirTransport;
import com.minsat.air.transport.AirTransportException;
import com.minsat.air.xml.XmlHelper;
import com.minsat.air.xml.XmlParser;
import com.minsat.config.AirConfig;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UpdateRefillBarring {

    private static final List<String> VALID_ACTIONS = List.of("BAR", "CLEAR", "STEP");

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public UpdateRefillBarring(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    /**
     * @param subscriberNumber MSISDN (required)
     * @param action           BAR | CLEAR | STEP
     */
    public AirResponse execute(String subscriberNumber, String action) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");
        if (action == null || !VALID_ACTIONS.contains(action))
            throw new IllegalArgumentException("action must be one of: " + VALID_ACTIONS);

        String txnId = UUID.randomUUID().toString();
        String members = XmlHelper.mandatoryMembers(config, txnId)
                       + XmlHelper.member("subscriberNumber", subscriberNumber)
                       + XmlHelper.member("refillBarAction", action);
        String xml = XmlHelper.wrapMethodCall("UpdateRefillBarring", members);
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "UpdateRefillBarring"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
