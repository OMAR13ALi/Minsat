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
public class UpdateBalanceAndDate {

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public UpdateBalanceAndDate(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    /** Entry for a dedicated account balance update */
    public record DedicatedAccountUpdate(int accountId, String relativeAmount, String absoluteValue) {}

    /**
     * @param subscriberNumber       MSISDN (required)
     * @param currency               ISO currency code, required if adjustmentAmount or dedicatedAccounts present
     * @param adjustmentAmount       main account relative adjustment (can be null)
     * @param supervisionExpiryDate  AIR date string (can be null)
     * @param serviceFeeExpiryDate   AIR date string (can be null)
     * @param creditClearancePeriod  days (can be null)
     * @param serviceRemovalPeriod   days (can be null)
     * @param dedicatedAccounts      per-DA updates (can be null/empty)
     */
    public AirResponse execute(
            String subscriberNumber,
            String currency,
            String adjustmentAmount,
            String supervisionExpiryDate,
            String serviceFeeExpiryDate,
            Integer creditClearancePeriod,
            Integer serviceRemovalPeriod,
            List<DedicatedAccountUpdate> dedicatedAccounts) {

        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");
        if (adjustmentAmount != null && (currency == null || currency.isBlank()))
            throw new IllegalArgumentException("currency is required when adjustmentAmount is provided");
        if (dedicatedAccounts != null && !dedicatedAccounts.isEmpty() && (currency == null || currency.isBlank()))
            throw new IllegalArgumentException("currency is required when dedicatedAccounts is provided");

        String txnId = UUID.randomUUID().toString();
        StringBuilder members = new StringBuilder();
        members.append(XmlHelper.mandatoryMembers(config, txnId));
        members.append(XmlHelper.member("subscriberNumber", subscriberNumber));

        if (currency != null) members.append(XmlHelper.member("transactionCurrency", currency));
        if (adjustmentAmount != null) members.append(XmlHelper.member("adjustmentAmountRelative", adjustmentAmount));
        if (supervisionExpiryDate != null) members.append(XmlHelper.memberDate("supervisionExpiryDate", supervisionExpiryDate));
        if (serviceFeeExpiryDate != null) members.append(XmlHelper.memberDate("serviceFeeExpiryDate", serviceFeeExpiryDate));
        if (creditClearancePeriod != null) members.append(XmlHelper.memberInt("creditClearancePeriod", creditClearancePeriod));
        if (serviceRemovalPeriod != null) members.append(XmlHelper.memberInt("serviceRemovalPeriod", serviceRemovalPeriod));

        if (dedicatedAccounts != null && !dedicatedAccounts.isEmpty()) {
            members.append("<member><name>dedicatedAccountUpdateInformation</name><value><array><data>\n");
            for (DedicatedAccountUpdate da : dedicatedAccounts) {
                members.append("<value><struct>");
                members.append(XmlHelper.memberInt("dedicatedAccountID", da.accountId()));
                if (da.relativeAmount() != null)
                    members.append(XmlHelper.member("adjustmentAmountRelative", da.relativeAmount()));
                if (da.absoluteValue() != null)
                    members.append(XmlHelper.member("dedicatedAccountValueNew", da.absoluteValue()));
                members.append("</struct></value>\n");
            }
            members.append("</data></array></value></member>\n");
        }

        String xml = XmlHelper.wrapMethodCall("UpdateBalanceAndDate", members.toString());
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "UpdateBalanceAndDate"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
