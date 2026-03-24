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
public class UpdateFaFList {

    private static final List<String> VALID_ACTIONS = List.of("ADD", "SET", "DELETE");

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public UpdateFaFList(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    public record FafEntry(String fafNumber, String owner) {}

    /**
     * @param subscriberNumber MSISDN
     * @param action           ADD | SET | DELETE
     * @param entries          FAF entries; may be empty only for SET
     */
    public AirResponse execute(String subscriberNumber, String action, List<FafEntry> entries) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");
        if (action == null || !VALID_ACTIONS.contains(action))
            throw new IllegalArgumentException("action must be one of: " + VALID_ACTIONS);
        if (entries == null) entries = List.of();
        if (!"SET".equals(action) && entries.isEmpty())
            throw new IllegalArgumentException("entries cannot be empty for action: " + action);

        String txnId = UUID.randomUUID().toString();
        StringBuilder members = new StringBuilder();
        members.append(XmlHelper.mandatoryMembers(config, txnId));
        members.append(XmlHelper.member("subscriberNumber", subscriberNumber));
        members.append(XmlHelper.member("fafAction", action));

        members.append("<member><name>fafInformation</name><value><array><data>\n");
        for (FafEntry e : entries) {
            String ownerVal = (e.owner() != null && !e.owner().isBlank()) ? e.owner() : "Subscriber";
            members.append("<value><struct>");
            members.append(XmlHelper.member("fafNumber", e.fafNumber()));
            members.append(XmlHelper.member("owner", ownerVal));
            members.append("</struct></value>\n");
        }
        members.append("</data></array></value></member>\n");

        String xml = XmlHelper.wrapMethodCall("UpdateFaFList", members.toString());
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "UpdateFaFList"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
