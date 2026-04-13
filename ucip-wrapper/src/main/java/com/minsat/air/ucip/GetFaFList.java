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
public class GetFaFList {

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public GetFaFList(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    /**
     * @param subscriberNumber MSISDN
     * @param requestedOwner   "Subscriber" or "Master" — if null defaults to "Subscriber"
     */
    public AirResponse execute(String subscriberNumber, String requestedOwner) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");

        String txnId = UUID.randomUUID().toString();
        String owner = (requestedOwner != null && !requestedOwner.isBlank()) ? requestedOwner : "Subscriber";
        // AIR spec §7.171: requestedOwner is <int> — 1=Subscriber, 2=Account, 3=Subscriber+Account
        int ownerInt = ("Master".equalsIgnoreCase(owner) || "Account".equalsIgnoreCase(owner)) ? 2 : 1;
        String members = XmlHelper.mandatoryMembers(config, txnId)
                       + XmlHelper.member("subscriberNumber", subscriberNumber)
                       + XmlHelper.memberInt("requestedOwner", ownerInt);
        String xml = XmlHelper.wrapMethodCall("GetFaFList", members);
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "GetFaFList"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
