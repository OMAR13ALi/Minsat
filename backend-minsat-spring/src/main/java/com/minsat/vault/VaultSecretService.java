package com.minsat.vault;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.vault.authentication.TokenAuthentication;
import org.springframework.vault.client.VaultEndpoint;
import org.springframework.vault.core.VaultTemplate;
import org.springframework.vault.support.VaultResponseSupport;

import java.net.URI;
import java.util.Map;


@Service
public class VaultSecretService {

    private static final Logger log = LoggerFactory.getLogger(VaultSecretService.class);

    @Value("${vault.uri}")
    private String vaultUri;

    @Value("${vault.token}")
    private String vaultToken;

    @Value("${vault.kv-path}")
    private String kvPath;

    @Value("${jwt.secret-fallback}")
    private String jwtSecretFallback;

    @Value("${spring.mail.username}")
    private String mailUserFallback;

    @Value("${spring.mail.password}")
    private String mailPassFallback;

    private String jwtSecret;
    private String adminEmail;
    private String adminPassword;

    @PostConstruct
    public void loadSecrets() {
        try {
            VaultEndpoint endpoint = VaultEndpoint.from(URI.create(vaultUri));
            VaultTemplate vaultTemplate = new VaultTemplate(endpoint, new TokenAuthentication(vaultToken));

            VaultResponseSupport<Map> response = vaultTemplate.read(kvPath, Map.class);
            if (response != null && response.getData() != null) {
                @SuppressWarnings("unchecked")
                Map<String, Object> data = (Map<String, Object>) response.getData().get("data");
                if (data != null) {
                    jwtSecret    = (String) data.getOrDefault("jwt_secret", jwtSecretFallback);
                    adminEmail   = (String) data.getOrDefault("mail_user", mailUserFallback);
                    adminPassword = (String) data.getOrDefault("mail_pass", mailPassFallback);
                    log.info("Vault secrets loaded from {}", kvPath);
                    return;
                }
            }
        } catch (Exception e) {
            log.warn("Vault unreachable ({}), falling back to application.properties", e.getMessage());
        }
        // Fallback
        jwtSecret     = jwtSecretFallback;
        adminEmail    = mailUserFallback;
        adminPassword = mailPassFallback;
    }

    public String getJwtSecret()      { return jwtSecret; }
    public String getAdminEmail()     { return adminEmail; }
    public String getAdminPassword()  { return adminPassword; }
}
