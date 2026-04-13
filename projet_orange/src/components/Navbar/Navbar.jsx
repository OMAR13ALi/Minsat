import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch, FiLogOut, FiBell, FiSettings } from "react-icons/fi";
import { ChevronDown } from 'lucide-react';

const NavbarContainer = styled.div`
  background: #ffffff;
  height: 64px;
  width: 100%;
  border-bottom: 1px solid #eaecf0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.05);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const BreadcrumbArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;

  .page-title {
    font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
    font-size: 13px;
    font-weight: 700;
    color: #101828;
    line-height: 1.2;
    letter-spacing: 0.02em;
  }

  .page-breadcrumb {
    font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
    font-size: 11px;
    color: #98a2b3;
    line-height: 1.2;
    letter-spacing: 0.01em;
  }
`;

const SearchSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .search-icon {
    position: absolute;
    left: 12px;
    color: #98a2b3;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  input {
    background: #f9fafb;
    border: 1px solid #eaecf0;
    border-radius: 8px;
    height: 36px;
    padding: 0 16px 0 38px;
    font-size: 13px;
    color: #101828;
    outline: none;
    width: 260px;
    font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: #98a2b3;
    }

    &:focus {
      border-color: #ff6600;
      box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.08);
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #667085;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f4f5f7;
    color: #101828;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 28px;
  background: #eaecf0;
  margin: 0 8px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px 6px 6px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: #f4f5f7;
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  background: #ff6600;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;

  .user-name {
    color: #101828;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.2;
    font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
  }

  .user-role {
    color: #98a2b3;
    font-size: 10px;
    font-weight: 500;
    line-height: 1.2;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border: 1px solid #eaecf0;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(16, 24, 40, 0.12);
  min-width: 180px;
  z-index: 1000;
  overflow: hidden;

  .dropdown-item {
    padding: 12px 16px;
    color: #101828;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);

    &:hover {
      background: #fff5f0;
      color: #ff6600;
    }

    .dropdown-icon {
      font-size: 16px;
      opacity: 0.8;
    }
  }
`;

const Navbar = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    try {
      if (typeof(Storage) !== "undefined") {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        sessionStorage.clear();
      }
      window.location.replace('/login');
    } catch (error) {
      window.location.href = '/login';
    }
  };

  const userInitial = user?.username ? user.username.charAt(0).toUpperCase() : 'U';
  const userName = user?.username || 'Utilisateur';
  const userRole = user?.class || 'USER';

  return (
    <NavbarContainer>
      <LeftSection>
        <BreadcrumbArea>
          <span className="page-title">MINSAT</span>
          <span className="page-breadcrumb">Telecom Admin Platform</span>
        </BreadcrumbArea>
        <SearchSection>
          <span className="search-icon"><FiSearch size={15} /></span>
          <input
            type="text"
            placeholder="Search MSISDN or customer..."
            readOnly
          />
        </SearchSection>
      </LeftSection>

      <RightSection>
        <span style={{ position: 'relative', display: 'inline-flex' }}>
          <IconButton title="Notifications">
            <FiBell size={17} />
          </IconButton>
          <span style={{
            position: 'absolute', top: '7px', right: '7px',
            width: '6px', height: '6px',
            background: '#ff6600', borderRadius: '50%',
            border: '1.5px solid white', pointerEvents: 'none'
          }} />
        </span>
        <IconButton title="Settings">
          <FiSettings size={17} />
        </IconButton>
        <Divider />
        <UserSection
          ref={userDropdownRef}
          onClick={() => setShowUserDropdown(!showUserDropdown)}
        >
          <UserAvatar>{userInitial}</UserAvatar>
          <UserInfo>
            <span className="user-name">{userName}</span>
            <span className="user-role">{userRole}</span>
          </UserInfo>
          <ChevronDown size={14} color="#9ca3af" />

          {showUserDropdown && (
            <DropdownMenu>
              <div className="dropdown-item" onClick={handleLogout}>
                <FiLogOut className="dropdown-icon" />
                Logout
              </div>
            </DropdownMenu>
          )}
        </UserSection>
      </RightSection>
    </NavbarContainer>
  );
};

export default Navbar;
