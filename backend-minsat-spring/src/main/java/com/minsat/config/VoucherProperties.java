package com.minsat.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "voucher")
public class VoucherProperties {

    private String url;
    private String auth;

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getAuth() { return auth; }
    public void setAuth(String auth) { this.auth = auth; }
}
