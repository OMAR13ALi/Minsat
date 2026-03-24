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
public class GetRefillOptions {

    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public GetRefillOptions(AirConfig config, AirTransport airTransport, XmlParser xmlParser) {
        this.config = config;
        this.airTransport = airTransport;
        this.xmlParser = xmlParser;
    }

    /**
     * @param subscriberNumber   MSISDN
     * @param voucherCode        optional voucher activation code
     * @param serviceClassCurrent optional service class filter
     */
    public AirResponse execute(String subscriberNumber, String voucherCode, Integer serviceClassCurrent) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");

        String txnId = UUID.randomUUID().toString();
        StringBuilder members = new StringBuilder();
        members.append(XmlHelper.mandatoryMembers(config, txnId));
        members.append(XmlHelper.member("subscriberNumber", subscriberNumber));
        if (voucherCode != null && !voucherCode.isBlank())
            members.append(XmlHelper.member("voucherActivationCode", voucherCode));
        if (serviceClassCurrent != null)
            members.append(XmlHelper.memberInt("serviceClassCurrent", serviceClassCurrent));

        String xml = XmlHelper.wrapMethodCall("GetRefillOptions", members.toString());
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "GetRefillOptions"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
