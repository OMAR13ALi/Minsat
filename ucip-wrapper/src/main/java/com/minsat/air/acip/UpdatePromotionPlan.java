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
public class UpdatePromotionPlan {

    private static final List<String> VALID_ACTIONS = List.of("ADD", "SET", "DELETE");

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public UpdatePromotionPlan(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    /**
     * ADD  requires: planId, startDate, endDate
     * SET  requires: oldStartDate, oldEndDate, startDate, endDate
     * DELETE requires: oldStartDate, oldEndDate
     *
     * All date values must be in AIR ISO-8601 format.
     */
    public AirResponse execute(String subscriberNumber, String action,
                               String planId,
                               String oldStartDate, String oldEndDate,
                               String startDate, String endDate) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");
        if (action == null || !VALID_ACTIONS.contains(action))
            throw new IllegalArgumentException("action must be one of: " + VALID_ACTIONS);

        switch (action) {
            case "ADD" -> {
                require(planId, "planId", "ADD");
                require(startDate, "startDate", "ADD");
                require(endDate, "endDate", "ADD");
            }
            case "SET" -> {
                require(oldStartDate, "oldStartDate", "SET");
                require(oldEndDate, "oldEndDate", "SET");
                require(startDate, "startDate", "SET");
                require(endDate, "endDate", "SET");
            }
            case "DELETE" -> {
                require(oldStartDate, "oldStartDate", "DELETE");
                require(oldEndDate, "oldEndDate", "DELETE");
            }
        }

        String txnId = UUID.randomUUID().toString();
        StringBuilder members = new StringBuilder();
        members.append(XmlHelper.mandatoryMembers(config, txnId));
        members.append(XmlHelper.member("subscriberNumber", subscriberNumber));
        members.append(XmlHelper.member("promotionPlanAction", action));
        if (planId != null) members.append(XmlHelper.member("promotionPlanID", planId));
        if (oldStartDate != null) members.append(XmlHelper.memberDate("promotionOldStartDate", oldStartDate));
        if (oldEndDate != null) members.append(XmlHelper.memberDate("promotionOldEndDate", oldEndDate));
        if (startDate != null) members.append(XmlHelper.memberDate("promotionStartDate", startDate));
        if (endDate != null) members.append(XmlHelper.memberDate("promotionEndDate", endDate));

        String xml = XmlHelper.wrapMethodCall("UpdatePromotionPlan", members.toString());
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "UpdatePromotionPlan"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }

    private void require(String value, String field, String context) {
        if (value == null || value.isBlank())
            throw new IllegalArgumentException("UpdatePromotionPlan " + context + ": " + field + " is required");
    }
}
