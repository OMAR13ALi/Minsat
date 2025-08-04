import React, { useState } from 'react';
import styled from 'styled-components';
import { FiEdit2, FiSave, FiX, FiPhone, FiMail, FiShield, FiCheck } from 'react-icons/fi';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #f8fafc;
  min-height: 100vh;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 30px;
  text-align: center;
  color: white;
  
  .profile-avatar {
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 40px;
    backdrop-filter: blur(10px);
    border: 3px solid rgba(255, 255, 255, 0.3);
  }
  
  .profile-name {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  
  .profile-id {
    font-size: 16px;
    opacity: 0.9;
    font-weight: 400;
  }
`;

const ProfileContent = styled.div`
  padding: 10px 20px;
`;

const FieldGroup = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FieldLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 600;
  font-size: 16px;
  
  .field-icon {
    color: #667eea;
  }
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 2px 20px;
  transition: all 0.3s ease;
  
  &.editing {
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const FieldInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #2d3748;
  font-weight: 500;
  outline: none;
  
  &::placeholder {
    color: #a0aec0;
  }
  
  &:disabled {
    color: #718096;
    cursor: not-allowed;
  }
`;

const FieldValue = styled.div`
  flex: 1;
  font-size: 16px;
  color: #2d3748;
  font-weight: 500;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
  
  &.edit-btn {
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5a67d8;
      transform: translateY(-1px);
    }
  }
  
  &.save-btn {
    background: #48bb78;
    color: white;
    
    &:hover {
      background: #38a169;
      transform: translateY(-1px);
    }
  }
  
  &.cancel-btn {
    background: #fed7d7;
    color: #e53e3e;
    
    &:hover {
      background: #feb2b2;
      transform: translateY(-1px);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ResetPasswordContainer = styled.div`
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  
  &.requesting {
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &.success {
    border-color: #48bb78;
    background: #f0fff4;
    box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
  }
`;

const ResetPasswordContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const ResetPasswordInfo = styled.div`
  flex: 1;
  
  .reset-title {
    font-size: 16px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 6px;
  }
  
  .reset-description {
    font-size: 14px;
    color: #718096;
    line-height: 1.4;
  }
  
  &.success {
    .reset-title {
      color: #38a169;
    }
    
    .reset-description {
      color: #68d391;
    }
  }
`;

const ResetPasswordButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &.reset-btn {
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5a67d8;
      transform: translateY(-1px);
    }
    
    &:disabled {
      background: #a0aec0;
      cursor: not-allowed;
      transform: none;
    }
  }
  
  &.success-btn {
    background: #48bb78;
    color: white;
    cursor: default;
    
    &:hover {
      transform: none;
    }
  }
`;

const SpinnerStyle = {
  width: '16px',
  height: '16px',
  border: '2px solid #ffffff',
  borderTop: '2px solid transparent',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
};

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    phone: '+216 53666692',
    email: 'wassimkhalifa02@gmail.com'
  });

  const [editing, setEditing] = useState({
    phone: false,
    email: false
  });

  const [tempValues, setTempValues] = useState({});
  const [resetPasswordStatus, setResetPasswordStatus] = useState('idle');

  const handleEdit = (field) => {
    setEditing(prev => ({ ...prev, [field]: true }));
    setTempValues(prev => ({ ...prev, [field]: userInfo[field] }));
  };

  const handleSave = (field) => {
    setUserInfo(prev => ({ ...prev, [field]: tempValues[field] }));
    setEditing(prev => ({ ...prev, [field]: false }));
    setTempValues(prev => {
      const newTemp = { ...prev };
      delete newTemp[field];
      return newTemp;
    });
  };

  const handleCancel = (field) => {
    setEditing(prev => ({ ...prev, [field]: false }));
    setTempValues(prev => {
      const newTemp = { ...prev };
      delete newTemp[field];
      return newTemp;
    });
  };

  const handleInputChange = (field, value) => {
    setTempValues(prev => ({ ...prev, [field]: value }));
  };

  const handleResetPassword = async () => {
    setResetPasswordStatus('requesting');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Password reset email sent to:', userInfo.email);
      setResetPasswordStatus('sent');
      
      setTimeout(() => {
        setResetPasswordStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Failed to send reset email:', error);
      setResetPasswordStatus('idle');
    }
  };

  const renderResetPassword = () => {
    const isRequesting = resetPasswordStatus === 'requesting';
    const isSent = resetPasswordStatus === 'sent';
    
    return (
      <FieldGroup>
        <FieldLabel>
          <FiShield className="field-icon" />
          Password Security
        </FieldLabel>
        <ResetPasswordContainer className={isRequesting ? 'requesting' : isSent ? 'success' : ''}>
          <ResetPasswordContent>
            <ResetPasswordInfo className={isSent ? 'success' : ''}>
              <div className="reset-title">
                {isSent ? 'Reset Email Sent!' : 'Reset Password'}
              </div>
              <div className="reset-description">
                {isSent 
                  ? `A password reset link has been sent to ${userInfo.email}. Check your inbox and follow the instructions.`
                  : `Send a secure password reset link to your email address: ${userInfo.email}`
                }
              </div>
            </ResetPasswordInfo>
            <ResetPasswordButton
              className={isSent ? 'success-btn' : 'reset-btn'}
              onClick={handleResetPassword}
              disabled={isRequesting}
            >
              {isRequesting ? (
                <>
                  <div style={SpinnerStyle} />
                  Sending...
                </>
              ) : isSent ? (
                <>
                  <FiCheck />
                  Email Sent
                </>
              ) : (
                <>
                  <FiMail />
                  Send Reset Link
                </>
              )}
            </ResetPasswordButton>
          </ResetPasswordContent>
        </ResetPasswordContainer>
      </FieldGroup>
    );
  };

  const renderField = (field, label, icon, type = 'text') => {
    const isEditing = editing[field];
    const value = isEditing ? tempValues[field] : userInfo[field];

    return (
      <FieldGroup key={field}>
        <FieldLabel>
          {icon}
          {label}
        </FieldLabel>
        <FieldContainer className={isEditing ? 'editing' : ''}>
          {isEditing ? (
            <FieldInput
              type={type}
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={`Enter your ${label.toLowerCase()}`}
              autoFocus
            />
          ) : (
            <FieldValue>
              {value}
            </FieldValue>
          )}
          
          <ButtonGroup>            
            {isEditing ? (
              <>
                <ActionButton
                  className="save-btn"
                  onClick={() => handleSave(field)}
                  title="Save changes"
                >
                  <FiSave />
                </ActionButton>
                <ActionButton
                  className="cancel-btn"
                  onClick={() => handleCancel(field)}
                  title="Cancel editing"
                >
                  <FiX />
                </ActionButton>
              </>
            ) : (
              <ActionButton
                className="edit-btn"
                onClick={() => handleEdit(field)}
                title={`Edit ${label.toLowerCase()}`}
              >
                ✏️
              </ActionButton>
            )}
          </ButtonGroup>
        </FieldContainer>
      </FieldGroup>
    );
  };

  return (
    <ProfileContainer style={{ height: '100vh', overflowY: 'auto' }}>
      <ProfileCard>
        <ProfileHeader>
          <div className="profile-avatar">
            👤
          </div>
          <div className="profile-name">Bilel BOUSSAA</div>
          <div className="profile-id">ID: BB71947</div>
        </ProfileHeader>
        
        <ProfileContent>
          {renderField('phone', 'Phone Number', <FiPhone className="field-icon" />, 'tel')}
          {renderResetPassword()}
        </ProfileContent>
      </ProfileCard>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </ProfileContainer>
  );
};

export default Profile;