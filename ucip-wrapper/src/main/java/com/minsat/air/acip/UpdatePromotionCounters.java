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
public class UpdatePromotionCounters {

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public UpdatePromotionCounters(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    /**
     * @param subscriberNumber              MSISDN (required)
     * @param transactionCurrency           ISO currency (required when amount is provided)
     * @param promotionRefillAmountRelative relative promotion refill amount (optional)
     */
    public AirResponse execute(String subscriberNumber, String transactionCurrency,
                               String promotionRefillAmountRelative) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");
        if (promotionRefillAmountRelative != null
                && (transactionCurrency == null || transactionCurrency.isBlank()))
            throw new IllegalArgumentException("transactionCurrency is required when promotionRefillAmountRelative is provided");

        String txnId = UUID.randomUUID().toString();
        StringBuilder members = new StringBuilder();
        members.append(XmlHelper.mandatoryMembers(config, txnId));
        members.append(XmlHelper.member("subscriberNumber", subscriberNumber));
        if (transactionCurrency != null) members.append(XmlHelper.member("transactionCurrency", transactionCurrency));
        if (promotionRefillAmountRelative != null)
            members.append(XmlHelper.member("promotionRefillAmountRelative", promotionRefillAmountRelative));

        String xml = XmlHelper.wrapMethodCall("UpdatePromotionCounters", members.toString());
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "UpdatePromotionCounters"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
