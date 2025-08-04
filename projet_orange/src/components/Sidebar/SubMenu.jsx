import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#f97316')};
  background: ${({ $isActive }) => ($isActive ? '#f97316' : 'transparent')};
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 60px;
  text-decoration: none;
  font-size: 22px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ $isActive }) => ($isActive ? '#ea580c' : '#fff7ed')};
    border-left: 4px solid #f97316;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 20px;
  display: ${({ collapsed }) => (collapsed ? 'none' : 'inline')};
`;

const DropdownLink = styled(Link)`
  background: ${({ $isActive }) => ($isActive ? '#ffedd5' : '#fff7ed')};
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ $isActive }) => ($isActive ? '#ea580c' : '#f97316')};
  font-size: 18px;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  border-left: ${({ $isActive }) => ($isActive ? '4px solid #f97316' : 'none')};
  transition: all 0.3s ease;

  &:hover {
    background: #ffedd5;
    cursor: pointer;
  }
`;

const SubMenu = ({ item, collapsed, isOpen, showTitles, onOpen }) => {
  const location = useLocation();
  
  // Check if current path matches this item or any of its subnav items
  const isMainActive = location.pathname === item.path;
  const isSubActive = item.subNav && item.subNav.some(subItem => location.pathname === subItem.path);
  const isActive = isMainActive || isSubActive;

  const iconStyle = {
    color: isActive ? (isMainActive ? 'white' : '#f97316') : 'black',
    fontSize: '28px',
    minWidth: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '16px',
  };

  const handleClick = (e) => {
    if (item.subNav) {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <>
      <SidebarLink 
        to={item.path} 
        onClick={handleClick}
        $isActive={isMainActive}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={iconStyle}>{item.icon}</span>
          <SidebarLabel collapsed={!showTitles}>{item.title}</SidebarLabel>
        </div>
        <div>
          {!collapsed && item.subNav && (isOpen ? item.iconOpened : item.iconClosed)}
        </div>
      </SidebarLink>

      {isOpen &&
        item.subNav &&
        item.subNav.map((subItem, index) => {
          const isSubItemActive = location.pathname === subItem.path;
          return (
            <DropdownLink 
              to={subItem.path} 
              key={index}
              $isActive={isSubItemActive}
            >
              <span style={{
                ...iconStyle,
                color: isSubItemActive ? '#ea580c' : '#f97316'
              }}>
                {subItem.icon}
              </span>
              <SidebarLabel collapsed={false}>{subItem.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;