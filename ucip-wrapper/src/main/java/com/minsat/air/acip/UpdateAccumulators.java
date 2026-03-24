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
public class UpdateAccumulators {

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public UpdateAccumulators(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    /** Each entry must have accumulatorId and either relativeValue or absoluteValue */
    public record AccumulatorEntry(int accumulatorId, String relativeValue, String absoluteValue, String startDate) {}

    /**
     * @param subscriberNumber MSISDN (required)
     * @param accumulators     non-empty list of accumulator updates
     */
    public AirResponse execute(String subscriberNumber, List<AccumulatorEntry> accumulators) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");
        if (accumulators == null || accumulators.isEmpty())
            throw new IllegalArgumentException("accumulators must be a non-empty list");

        for (AccumulatorEntry acc : accumulators) {
            if (acc.relativeValue() == null && acc.absoluteValue() == null)
                throw new IllegalArgumentException("Each accumulator entry must have relativeValue or absoluteValue");
        }

        String txnId = UUID.randomUUID().toString();
        StringBuilder members = new StringBuilder();
        members.append(XmlHelper.mandatoryMembers(config, txnId));
        members.append(XmlHelper.member("subscriberNumber", subscriberNumber));

        members.append("<member><name>accumulatorInformation</name><value><array><data>\n");
        for (AccumulatorEntry acc : accumulators) {
            members.append("<value><struct>");
            members.append(XmlHelper.memberInt("accumulatorID", acc.accumulatorId()));
            if (acc.relativeValue() != null)
                members.append(XmlHelper.member("accumulatorValueRelative", acc.relativeValue()));
            if (acc.absoluteValue() != null)
                members.append(XmlHelper.member("accumulatorValueAbsolute", acc.absoluteValue()));
            if (acc.startDate() != null)
                members.append(XmlHelper.memberDate("accumulatorStartDate", acc.startDate()));
            members.append("</struct></value>\n");
        }
        members.append("</data></array></value></member>\n");

        String xml = XmlHelper.wrapMethodCall("UpdateAccumulators", members.toString());
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "UpdateAccumulators"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
