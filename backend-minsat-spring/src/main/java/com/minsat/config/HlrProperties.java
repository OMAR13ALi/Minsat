package com.minsat.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "hlr")
public class HlrProperties {

    private String host;
    private int port = 7776;
    private String loginCmd;
    private int timeoutMs = 5000;

    public String getHost() { return host; }
    public void setHost(String host) { this.host = host; }

    public int getPort() { return port; }
    public void setPort(int port) { this.port = port; }

    public String getLoginCmd() { return loginCmd; }
    public void setLoginCmd(String loginCmd) { this.loginCmd = loginCmd; }

    public int getTimeoutMs() { return timeoutMs; }
    public void setTimeoutMs(int timeoutMs) { this.timeoutMs = timeoutMs; }
}
