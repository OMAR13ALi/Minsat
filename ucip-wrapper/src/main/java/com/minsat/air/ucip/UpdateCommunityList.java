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
public class UpdateCommunityList {

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public UpdateCommunityList(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    /**
     * @param subscriberNumber MSISDN
     * @param communityIds     list of community IDs to set (replaces existing list)
     */
    public AirResponse execute(String subscriberNumber, List<Integer> communityIds) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");
        if (communityIds == null)
            communityIds = List.of();

        String txnId = UUID.randomUUID().toString();
        StringBuilder members = new StringBuilder();
        members.append(XmlHelper.mandatoryMembers(config, txnId));
        members.append(XmlHelper.member("subscriberNumber", subscriberNumber));

        members.append("<member><name>communityInformationNew</name><value><array><data>\n");
        for (Integer id : communityIds) {
            members.append("<value><struct>");
            members.append(XmlHelper.memberInt("communityID", id));
            members.append("</struct></value>\n");
        }
        members.append("</data></array></value></member>\n");

        String xml = XmlHelper.wrapMethodCall("UpdateCommunityList", members.toString());
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "UpdateCommunityList"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
