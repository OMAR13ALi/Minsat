package com.minsat.voucher;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class VoucherController {

    private final VoucherService voucherService;

    public VoucherController(VoucherService voucherService) {
        this.voucherService = voucherService;
    }

    @GetMapping("/serialnumber/{sn}")
    public ResponseEntity<Map<String, Object>> getBySerialNumber(@PathVariable String sn) {
        return ResponseEntity.ok(voucherService.getBySerialNumber(sn));
    }

    @GetMapping("/activationcode/{code}")
    public ResponseEntity<Map<String, Object>> getByActivationCode(@PathVariable String code) {
        return ResponseEntity.ok(voucherService.getByActivationCode(code));
    }
}
