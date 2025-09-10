import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosRefresh } from "react-icons/io";
import { FiSearch, FiUser, FiLogOut, FiSettings } from "react-icons/fi";

const NavbarContainer = styled.div`
  background: #ffffff;
  height: 100px;
  width: 100%;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: #f7fafc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background: #edf2f7;
  }
`;

const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  background: #ff6b35;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
  font-weight: 600;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .user-name {
    color: #2d3748;
    font-size: 18px;
    font-weight: 600;
  }
  
  .user-id {
    color: #718096;
    font-size: 16px;
    font-weight: 400;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #718096;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f7fafc;
    color: #4a5568;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  z-index: 1000;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 20px;
    width: 12px;
    height: 12px;
    background: white;
    border: 1px solid #e2e8f0;
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
  }
  
  .dropdown-item {
    padding: 16px 20px;
    color: #2d3748;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid #f7fafc;
    
    &:hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      transform: translateX(4px);
    }
    
    &:last-child {
      border-bottom: none;
      
      &:hover {
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
      }
    }
    
    .dropdown-icon {
      font-size: 18px;
      opacity: 0.8;
    }
  }
`;

const Navbar = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [user, setUser] = useState(null); // 👈 état user
  const userDropdownRef = useRef(null);

   useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleLogout = () => {
    try {
      // Clear any stored authentication data
      if (typeof(Storage) !== "undefined") {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        sessionStorage.clear();
      }
      
      // Force navigation to login page
      window.location.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback navigation
      window.location.href = '/login';
    }
  };

  const handleDropdownLogout = () => {
    setShowUserDropdown(false);
    handleLogout();
  };

  return (
    <NavbarContainer>
      <RightSection>
        <UserSection 
          ref={userDropdownRef}
          onClick={() => setShowUserDropdown(!showUserDropdown)}
        >
          <UserAvatar>👤</UserAvatar>
          <UserInfo>
            <span className="user-name">{user?.username || "Utilisateur"}</span>
            {/* <span className="user-id">( BB71947 )</span> */}
          </UserInfo>
          
          {showUserDropdown && (
            <DropdownMenu style={{ right: 0, left: 'auto' }}>
             
              <div className="dropdown-item" onClick={handleDropdownLogout}>
                <FiLogOut className="dropdown-icon" />
                Logout
              </div>
            </DropdownMenu>
          )}
        </UserSection>
        
        <LogoutButton onClick={handleLogout}>
          <FiLogOut size={20} />
        </LogoutButton>
      </RightSection>
    </NavbarContainer>
  );
};

export default Navbar;