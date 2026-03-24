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
public class InstallSubscriber {

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public InstallSubscriber(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    /**
     * @param subscriberNumber       MSISDN (required)
     * @param serviceClassNew        service class to assign (required)
     * @param temporaryBlockedFlag   whether to block on install (default false)
     * @param languageId             language ID (default 1)
     * @param ussdEocnId             USSD end-of-call notification ID (default 255)
     */
    public AirResponse execute(String subscriberNumber, int serviceClassNew,
                               boolean temporaryBlockedFlag, int languageId, int ussdEocnId) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");

        String txnId = UUID.randomUUID().toString();
        String members = XmlHelper.mandatoryMembers(config, txnId)
                       + XmlHelper.member("subscriberNumber", subscriberNumber)
                       + XmlHelper.memberInt("serviceClassNew", serviceClassNew)
                       + XmlHelper.memberBool("temporaryBlockedFlag", temporaryBlockedFlag)
                       + XmlHelper.memberInt("languageIDNew", languageId)
                       + XmlHelper.memberInt("ussdEndOfCallNotificationID", ussdEocnId);
        String xml = XmlHelper.wrapMethodCall("InstallSubscriber", members);
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "InstallSubscriber"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
