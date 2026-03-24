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
public class Refill {

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public Refill(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    /**
     * Provide either voucherCode OR (amount + currency + profileId) — not both.
     *
     * @param subscriberNumber MSISDN (required)
     * @param voucherCode      voucher activation code (XOR with amount/currency/profileId)
     * @param amount           refill amount in smallest currency unit
     * @param currency         ISO currency code
     * @param profileId        refill profile ID
     */
    public AirResponse execute(String subscriberNumber, String voucherCode,
                               String amount, String currency, String profileId) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");

        boolean hasVoucher = voucherCode != null && !voucherCode.isBlank();
        boolean hasVoucherless = amount != null || currency != null || profileId != null;

        if (hasVoucher && hasVoucherless)
            throw new IllegalArgumentException("provide either voucherCode or (amount+currency+profileId), not both");
        if (!hasVoucher && !hasVoucherless)
            throw new IllegalArgumentException("provide either voucherCode or (amount+currency+profileId)");

        String txnId = UUID.randomUUID().toString();
        StringBuilder members = new StringBuilder();
        members.append(XmlHelper.mandatoryMembers(config, txnId));
        members.append(XmlHelper.member("subscriberNumber", subscriberNumber));

        if (hasVoucher) {
            members.append(XmlHelper.member("voucherActivationCode", voucherCode));
        } else {
            members.append(XmlHelper.member("transactionAmount", amount));
            members.append(XmlHelper.member("transactionCurrency", currency));
            members.append(XmlHelper.member("refillProfileID", profileId));
        }

        String xml = XmlHelper.wrapMethodCall("Refill", members.toString());
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "Refill"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
