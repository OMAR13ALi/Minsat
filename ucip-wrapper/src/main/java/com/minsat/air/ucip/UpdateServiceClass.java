package com.minsat.air.ucip;

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
public class UpdateServiceClass {

    private static final List<String> VALID_ACTIONS = List.of("SetOriginal", "SetTemporary", "DeleteTemporary");

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public UpdateServiceClass(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    /**
     * @param subscriberNumber MSISDN
     * @param action           SetOriginal | SetTemporary | DeleteTemporary
     * @param serviceClassNew  required for SetOriginal/SetTemporary, ignored for DeleteTemporary
     */
    public AirResponse execute(String subscriberNumber, String action, Integer serviceClassNew) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");
        if (action == null || !VALID_ACTIONS.contains(action))
            throw new IllegalArgumentException("action must be one of: " + VALID_ACTIONS);
        if (!"DeleteTemporary".equals(action) && serviceClassNew == null)
            throw new IllegalArgumentException("serviceClassNew is required for action: " + action);

        String txnId = UUID.randomUUID().toString();
        StringBuilder members = new StringBuilder();
        members.append(XmlHelper.mandatoryMembers(config, txnId));
        members.append(XmlHelper.member("subscriberNumber", subscriberNumber));
        members.append(XmlHelper.member("serviceClassAction", action));
        if (serviceClassNew != null)
            members.append(XmlHelper.memberInt("serviceClassNew", serviceClassNew));

        String xml = XmlHelper.wrapMethodCall("UpdateServiceClass", members.toString());
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "UpdateServiceClass"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
