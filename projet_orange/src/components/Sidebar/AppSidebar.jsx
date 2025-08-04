import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { RiMenuFoldLine, RiMenuUnfoldLine, RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { AiOutlineUser, AiOutlineRead, AiFillQuestionCircle } from "react-icons/ai";
import { IoIosPaper } from "react-icons/io";

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

const LogoSection = styled.div`
  padding: 8px 24px 8px 24px;
  display: flex;
  align-items: ${({ collapsed }) => (collapsed ? 'flex-start' : 'center')};
  flex-direction: ${({ collapsed }) => (collapsed ? 'column' : 'row')};
  gap: ${({ collapsed }) => (collapsed ? '8px' : '16px')};
  position: relative;
  min-height: ${({ collapsed }) => (collapsed ? '110px' : '110px')};
  
  .logo-container {
    display: flex;
    align-items: center;
    justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'flex-start')};
    width: ${({ collapsed }) => (collapsed ? '100%' : 'auto')};
    flex: ${({ collapsed }) => (collapsed ? 'none' : '1')};
    margin-top: ${({ collapsed }) => (collapsed ? '0' : '0')};
  }
  
  .logo-image {
    height: ${({ collapsed }) => (collapsed ? '50px' : '100px')};
    width: auto;
    object-fit: contain;
    transition: all 0.3s ease;
  }
  
  .hamburger {
    background: none;
    border: none;
    color: #a0aec0;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    transition: all 0.2s ease;
    flex-shrink: 0;
    align-self: ${({ collapsed }) => (collapsed ? 'center' : 'center')};
    margin-top: ${({ collapsed }) => (collapsed ? '0' : '0')};
    
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

const MenuButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'space-between')};
  padding: ${({ collapsed }) => (collapsed ? '16px 12px' : '16px 24px')};
  background: transparent;
  border: none;
  color: #a0aec0;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    background: #333333;
    color: white;
    
    .menu-icon {
      color: white;
    }
  }

  &.active {
    background: #333333;
    color: white;
    
    .menu-icon {
      color: white;
    }
  }

  .menu-content {
    display: flex;
    align-items: center;
    gap: ${({ collapsed }) => (collapsed ? '0' : '16px')};
    justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'flex-start')};
  }

  .menu-icon {
    font-size: 20px;
    width: 20px;
    height: 20px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #a0aec0;
    
    svg {
      width: 20px !important;
      height: 20px !important;
      display: block !important;
      color: currentColor !important;
    }
  }
  
  .menu-text {
    display: ${({ collapsed }) => (collapsed ? 'none' : 'block')};
    font-size: 16px;
    font-weight: 500;
  }
  
  svg:last-child {
    font-size: 16px;
    display: ${({ collapsed }) => (collapsed ? 'none' : 'flex')};
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
`;

const SubMenuContainer = styled.div`
  background: transparent;
  overflow: hidden;
  transition: max-height 0.3s ease;
  max-height: ${({ $isOpen, collapsed }) => ($isOpen && !collapsed ? '300px' : '0')};
`;

const SubMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 24px 12px 58px;
  text-decoration: none;
  color: #718096;
  font-size: 15px;
  font-weight: 400;
  transition: all 0.2s ease;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    background: #333333;
    color: #e2e8f0;
  }

  &.active {
    background: #333333;
    color: white;
  }

  &:before {
    content: '•';
    position: absolute;
    left: 42px;
    color: #666666;
    font-size: 14px;
  }
`;

const Sidebar = ({ onToggle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null); // No menu open by default
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
      setOpenSubmenu(null); // Close all submenus when collapsing
    } else {
      setOpenSubmenu(null); // Keep all submenus closed when expanding
    }
  };

  const toggleSubmenu = (title) => {
    console.log('Toggling submenu:', title, 'Current open:', openSubmenu, 'Collapsed:', collapsed); // Debug log
    
    // If collapsed, temporarily expand the sidebar and open the submenu
    if (collapsed) {
      setCollapsed(false);
      if (onToggle) onToggle(false);
      setOpenSubmenu(title);
    } else {
      // Normal toggle behavior when expanded
      setOpenSubmenu(prevOpen => prevOpen === title ? null : title);
    }
  };

  const handleLogoClick = () => {
    window.location.href = '/customer/account';
  };

  const isItemActive = (item) => {
    return location.pathname === item.path || 
           (item.subItems && item.subItems.some(sub => location.pathname === sub.path));
  };

  const isSubItemActive = (subItem) => {
    return location.pathname === subItem.path;
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <LogoSection collapsed={collapsed}>
        <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img 
            src={collapsed ? "/assets/logo_compact.jpg" : "/assets/logo.webp"}
            alt="Logo" 
            className="logo-image"
            title="Go to Account page"
          />
        </div>
        <button className="hamburger" onClick={toggleCollapse}>
          {collapsed ? <RiMenuUnfoldLine size={24} /> : <RiMenuFoldLine size={24} />}
        </button>
      </LogoSection>

      <MenuSection>
        {menuItems.map((item, index) => {
          const isActive = isItemActive(item);
          const isOpen = openSubmenu === item.title;
          
          console.log(`Menu item ${item.title}: isOpen=${isOpen}, openSubmenu=${openSubmenu}`); // Debug log
          
          return (
            <MenuGroup key={index}>
              <MenuButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSubmenu(item.title);
                }}
                className={isActive ? 'active' : ''}
                collapsed={collapsed}
                title={collapsed ? `Click to expand ${item.title}` : ''}
              >
                <div className="menu-content">
                  <div className="menu-icon">
                    {item.icon}
                  </div>
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
                  >
                    {subItem.title}
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