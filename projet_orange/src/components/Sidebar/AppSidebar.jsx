import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { RiMenuFoldLine, RiMenuUnfoldLine, RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { AiOutlineUser, AiOutlineRead, AiFillQuestionCircle } from "react-icons/ai";

// Sidebar container
const SidebarContainer = styled.div`
  background: #000000;
  width: ${({ collapsed }) => (collapsed ? '80px' : '320px')};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow-y: auto;
  transition: width 0.3s ease;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #333333;
    border-radius: 2px;
  }
`;

// Logo section
const LogoSection = styled.div`
  padding: 8px 24px;
  display: flex;
  align-items: ${({ collapsed }) => (collapsed ? 'flex-start' : 'center')};
  flex-direction: ${({ collapsed }) => (collapsed ? 'column' : 'row')};
  gap: ${({ collapsed }) => (collapsed ? '8px' : '16px')};
  min-height: 110px;

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'flex-start')};
    width: ${({ collapsed }) => (collapsed ? '100%' : 'auto')};
    flex: ${({ collapsed }) => (collapsed ? 'none' : '1')};
    cursor: pointer;
  }

  .logo-image {
    height: ${({ collapsed }) => (collapsed ? '50px' : '100px')};
    transition: all 0.3s ease;
  }

  .hamburger {
    background: none;
    border: none;
    color: #a0aec0;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    &:hover {
      background: #333333;
      color: white;
    }
  }
`;

const MenuSection = styled.div`
  flex: 1;
  padding: 2px 0;
`;

const MenuGroup = styled.div`
  margin-bottom: 4px;
`;

// Menu button
const MenuButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'space-between')};
  padding: ${({ collapsed }) => (collapsed ? '12px 0' : '12px 20px')};
  background: none;
  border: none;
  color: ${({ collapsed }) => (collapsed ? '#a0aec0' : '#718096')};
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #333333;
    color: #e2e8f0;
  }
  &.active {
    background: #333333;
    color: white;
  }

  .menu-content {
    display: flex;
    align-items: center;
    gap: ${({ collapsed }) => (collapsed ? '0' : '16px')};
  }

  .menu-icon {
    font-size: 24px;
    width: 24px;
    height: 24px;
    min-width: 24px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #a0aec0;
  }
  .menu-icon svg {
    width: 24px !important;
    height: 24px !important;
    display: block !important;
    color: currentColor !important;
  }

  .menu-text {
    white-space: nowrap;
    display: ${({ collapsed }) => (collapsed ? 'none' : 'inline')};
  }
`;

// Submenu container
const SubMenuContainer = styled.div`
  background: transparent;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: ${({ $isOpen, collapsed }) => ($isOpen && !collapsed ? '300px' : '0')};
  opacity: ${({ $isOpen, collapsed }) => ($isOpen && !collapsed ? '1' : '0')};
  pointer-events: ${({ $isOpen, collapsed }) => ($isOpen && !collapsed ? 'auto' : 'none')};
`;

// Submenu item
const SubMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px ${({ collapsed }) => (collapsed ? '0' : '24px')} 12px ${({ collapsed }) => (collapsed ? '0' : '58px')};
  text-decoration: none;
  color: #718096;
  font-size: 15px;
  transition: all 0.2s ease;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'flex-start')};

  &:hover {
    background: #333333;
    color: #e2e8f0;
  }
  &.active {
    background: #333333;
    color: white;
  }

  /* Hide bullet when collapsed */
  &:before {
    content: ${({ collapsed }) => (collapsed ? '""' : '"•"')};
    position: absolute;
    left: 42px;
    color: #666666;
    font-size: 14px;
  }
`;

const Sidebar = ({ onToggle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState([]); 
  const location = useLocation();

  const menuItems = [
    {
      title: 'Customer Care',
      path: '/customer',
      icon: <AiOutlineUser />,
      iconClosed: <RiArrowDownSFill />,
      iconOpened: <RiArrowUpSFill />,
      subItems: [
        { title: 'Account', path: '/customer/account' },
        { title: 'History', path: '/customer/msisdn-history' },
        { title: 'Trace 4G', path: '/customer/trace-4G' }
      ]
    },
    {
      title: 'Lookup Vouchers',
      path: '/vs',
      icon: <AiOutlineRead />,
      iconClosed: <RiArrowDownSFill />,
      iconOpened: <RiArrowUpSFill />,
      subItems: [
        { title: 'Serial Number', path: '/vs/serial-number' },
        { title: 'Activation Code', path: '/vs/activation-code' }
      ]
    },
    {
      title: 'Help',
      path: '/help',
      icon: <AiFillQuestionCircle />,
      iconClosed: <RiArrowDownSFill />,
      iconOpened: <RiArrowUpSFill />,
      subItems: [
        { title: 'SC / DA Group / UA', path: '/help/scda' },
        { title: 'Service Identifier', path: '/help/service' },
        { title: 'Offer', path: '/help/offer' },
        { title: 'Usage Counters', path: '/help/usage' }
      ]
    }
  ];

  const toggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    if (onToggle) onToggle(newCollapsed);
    if (newCollapsed) {
      setOpenSubmenu([]); 
    }
  };

  const toggleSubmenu = (title) => {
    if (collapsed) {
      setCollapsed(false);
      if (onToggle) onToggle(false);
      setOpenSubmenu([title]);
    } else {
      setOpenSubmenu(prev =>
        prev.includes(title)
          ? prev.filter(t => t !== title)
          : [...prev, title]
      );
    }
  };

  const isItemActive = (item) =>
    location.pathname === item.path ||
    (item.subItems && item.subItems.some(sub => location.pathname === sub.path));

  const isSubItemActive = (subItem) => location.pathname === subItem.path;

  return (
    <SidebarContainer collapsed={collapsed}>
      <LogoSection collapsed={collapsed}>
        <div className="logo-container" onClick={() => window.location.href = '/customer/account'}>
          <img
            src={collapsed ? "/assets/logo_compact.jpg" : "/assets/logo.webp"}
            alt="Logo"
            className="logo-image"
          />
        </div>
        <button className="hamburger" onClick={toggleCollapse}>
          {collapsed ? <RiMenuUnfoldLine size={24} /> : <RiMenuFoldLine size={24} />}
        </button>
      </LogoSection>

      <MenuSection>
        {menuItems.map((item, index) => {
          const isActive = isItemActive(item);
          const isOpen = openSubmenu.includes(item.title);

          return (
            <MenuGroup key={index}>
              <MenuButton
                onClick={(e) => {
                  e.preventDefault();
                  toggleSubmenu(item.title);
                }}
                className={isActive ? 'active' : ''}
                collapsed={collapsed}
                title={collapsed ? `Click to expand ${item.title}` : ''}
              >
                <div className="menu-content">
                  <div className="menu-icon">{item.icon}</div>
                  <span className="menu-text">{item.title}</span>
                </div>
                {!collapsed && (isOpen ? item.iconOpened : item.iconClosed)}
              </MenuButton>

              <SubMenuContainer $isOpen={isOpen} collapsed={collapsed}>
                {item.subItems.map((subItem, subIndex) => (
                  <SubMenuItem
                    key={subIndex}
                    to={subItem.path}
                    className={isSubItemActive(subItem) ? 'active' : ''}
                    collapsed={collapsed}
                  >
                    {!collapsed && subItem.title}
                  </SubMenuItem>
                ))}
              </SubMenuContainer>
            </MenuGroup>
          );
        })}
      </MenuSection>
    </SidebarContainer>
  );
};

export default Sidebar;
