import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { RiMenuFoldLine, RiMenuUnfoldLine, RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { AiOutlineUser, AiOutlineRead, AiFillQuestionCircle, AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FiLogOut, FiActivity } from "react-icons/fi";

// Sidebar container
const SidebarContainer = styled.div`
  background: #0f1117;
  width: ${({ $collapsed }) => ($collapsed ? '80px' : '240px')};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.3s ease;
  border-right: 1px solid rgba(255,255,255,0.06);

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.1);
    border-radius: 2px;
  }
`;

// Logo section
const LogoSection = styled.div`
  padding: ${({ $collapsed }) => ($collapsed ? '12px 0' : '0 16px')};
  display: flex;
  align-items: center;
  flex-direction: ${({ $collapsed }) => ($collapsed ? 'column' : 'row')};
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'space-between')};
  gap: ${({ $collapsed }) => ($collapsed ? '8px' : '0')};
  min-height: 72px;
  flex-shrink: 0;

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
    width: ${({ $collapsed }) => ($collapsed ? '100%' : 'auto')};
    cursor: pointer;
  }

  .logo-image {
    height: ${({ $collapsed }) => ($collapsed ? '36px' : '52px')};
    transition: all 0.3s ease;
    object-fit: contain;
  }

  .hamburger {
    background: none;
    border: none;
    color: #8b8fa8;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
    &:hover {
      background: rgba(255,255,255,0.07);
      color: #e2e8f0;
    }
  }
`;

const MenuSection = styled.div`
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
  overflow-x: hidden;
`;

const MenuGroup = styled.div`
  margin-bottom: 2px;
`;

// Category section label
const CategoryLabel = styled.div`
  padding: ${({ $collapsed }) => ($collapsed ? '0' : '14px 14px 4px')};
  font-size: 10px;
  font-weight: 700;
  color: rgba(255,255,255,0.22);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
  overflow: hidden;
  height: ${({ $collapsed }) => ($collapsed ? '10px' : 'auto')};
  font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
  transition: height 0.3s ease;
`;

// Menu button (for items with submenus)
const MenuButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'space-between')};
  padding: ${({ $collapsed }) => ($collapsed ? '10px 0' : '10px 12px')};
  margin: ${({ $collapsed }) => ($collapsed ? '0' : '0 0')};
  background: none;
  border: none;
  color: #8b8fa8;
  font-size: 13px;
  font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: ${({ $collapsed }) => ($collapsed ? '0' : '10px')};

  &:hover {
    background: rgba(255,255,255,0.07);
    color: #e2e8f0;
    .menu-icon { color: #e2e8f0; }
  }
  &.active {
    background: rgba(255, 102, 0, 0.12);
    color: #ff6600;
    box-shadow: inset 3px 0 0 #ff6600;
    margin: 0 8px;
    width: calc(100% - 16px);
    .menu-icon { color: #ff6600; }
  }

  .menu-content {
    display: flex;
    align-items: center;
    gap: ${({ $collapsed }) => ($collapsed ? '0' : '12px')};
  }

  .menu-icon {
    font-size: 20px;
    width: 22px;
    height: 22px;
    min-width: 22px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #8b8fa8;
    transition: color 0.2s ease;
  }
  .menu-icon svg {
    width: 20px !important;
    height: 20px !important;
    display: block !important;
    color: currentColor !important;
  }

  .menu-text {
    white-space: nowrap;
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
  }

  .arrow-icon {
    color: #8b8fa8;
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'flex')};
    align-items: center;
  }
`;

// Menu link for items without submenus
const MenuLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  padding: ${({ $collapsed }) => ($collapsed ? '10px 0' : '10px 12px')};
  background: none;
  border: none;
  color: #8b8fa8;
  font-size: 13px;
  font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  border-radius: 10px;

  &:hover {
    background: rgba(255,255,255,0.07);
    color: #e2e8f0;
    .menu-icon { color: #e2e8f0; }
  }
  &.active {
    background: rgba(255, 102, 0, 0.12);
    color: #ff6600;
    box-shadow: inset 3px 0 0 #ff6600;
    margin: 0 8px;
    width: calc(100% - 16px);
    .menu-icon { color: #ff6600; }
  }

  .menu-content {
    display: flex;
    align-items: center;
    gap: ${({ $collapsed }) => ($collapsed ? '0' : '12px')};
  }

  .menu-icon {
    font-size: 20px;
    width: 22px;
    height: 22px;
    min-width: 22px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #8b8fa8;
    transition: color 0.2s ease;
  }
  .menu-icon svg {
    width: 20px !important;
    height: 20px !important;
    display: block !important;
    color: currentColor !important;
  }

  .menu-text {
    white-space: nowrap;
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
  }
`;

// Submenu container
const SubMenuContainer = styled.div`
  background: transparent;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: ${({ $isOpen, $collapsed }) => ($isOpen && !$collapsed ? '300px' : '0')};
  opacity: ${({ $isOpen, $collapsed }) => ($isOpen && !$collapsed ? '1' : '0')};
  pointer-events: ${({ $isOpen, $collapsed }) => ($isOpen && !$collapsed ? 'auto' : 'none')};
`;

// Submenu item
const SubMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 12px 8px 48px;
  text-decoration: none;
  color: #8b8fa8;
  font-size: 12px;
  font-weight: 400;
  transition: all 0.2s ease;
  position: relative;
  font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
  border-radius: 8px;
  margin: 0 8px;

  &:hover {
    background: rgba(255,255,255,0.06);
    color: #e2e8f0;
  }
  &.active {
    color: #ff6600;
    font-weight: 600;
    background: rgba(255,102,0,0.08);
    box-shadow: inset 3px 0 0 #ff6600;
  }

  &:before {
    content: "•";
    position: absolute;
    left: 28px;
    color: #444;
    font-size: 10px;
  }
  &.active:before {
    color: #ff6600;
  }
`;

// Logout section pinned to bottom
const LogoutSection = styled.div`
  padding: 12px 10px;
  border-top: 1px solid rgba(255,255,255,0.06);
  flex-shrink: 0;
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  gap: ${({ $collapsed }) => ($collapsed ? '0' : '12px')};
  padding: ${({ $collapsed }) => ($collapsed ? '10px 0' : '10px 12px')};
  background: none;
  border: none;
  color: #8b8fa8;
  font-size: 13px;
  font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 10px;

  &:hover {
    background: rgba(255, 80, 80, 0.12);
    color: #ff6b6b;
  }

  .logout-text {
    white-space: nowrap;
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
  }
`;

const Sidebar = ({ onToggle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState([]);
  const location = useLocation();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isAdmin = user?.class?.toLowerCase() === "admin";

  const adminItems = isAdmin ? [
    {
      title: 'User Management',
      path: '/user-management',
      icon: <AiOutlineUsergroupAdd />,
      category: 'Admin'
    },
    {
      title: 'System Logs',
      path: '/admin/logs',
      icon: <FiActivity />,
      category: 'Admin'
    }
  ] : [];

  const toolsItems = [
    {
      title: 'AI Assistant',
      path: '/chatbot',
      icon: <IoChatbubblesOutline />,
      category: 'Tools',
    },
  ];

  const operationsItems = [
    {
      title: 'Customer Care',
      path: '/customer',
      icon: <AiOutlineUser />,
      iconClosed: <RiArrowDownSFill />,
      iconOpened: <RiArrowUpSFill />,
      category: 'Operations',
      subItems: [
        { title: 'Account', path: '/customer/account' },
        { title: 'History', path: '/customer/msisdn-history' }
      ]
    },
    {
      title: 'Lookup Vouchers',
      path: '/vs',
      icon: <AiOutlineRead />,
      iconClosed: <RiArrowDownSFill />,
      iconOpened: <RiArrowUpSFill />,
      subItems: [
        { title: 'Activation Code', path: '/vs/activation-code' }
      ]
    }
  ];

  const referenceItems = [
    {
      title: 'Help',
      path: '/help',
      icon: <AiFillQuestionCircle />,
      iconClosed: <RiArrowDownSFill />,
      iconOpened: <RiArrowUpSFill />,
      category: 'Reference Data',
      subItems: [
        { title: 'SC / DA Group / UA', path: '/help/scda' },
        { title: 'Service Identifier', path: '/help/service' },
        { title: 'Offer', path: '/help/offer' },
        { title: 'Usage Counters', path: '/help/usage' }
      ]
    }
  ];

  const menuItems = [...adminItems, ...toolsItems, ...operationsItems, ...referenceItems];

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

  return (
    <SidebarContainer $collapsed={collapsed}>
      <LogoSection $collapsed={collapsed}>
        <div className="logo-container" onClick={() => window.location.href = '/customer/account'}>
          <img
            src={collapsed ? "/assets/SONIC_logo_collapsed.png" : "/assets/SONIC_logo.png"}
            alt="Logo"
            className="logo-image"
          />
        </div>
        <button className="hamburger" onClick={toggleCollapse}>
          {collapsed ? <RiMenuUnfoldLine size={22} /> : <RiMenuFoldLine size={22} />}
        </button>
      </LogoSection>

      <MenuSection>
        {menuItems.map((item, index) => {
          const isActive = isItemActive(item);
          const isOpen = openSubmenu.includes(item.title);
          const prevItem = menuItems[index - 1];
          const showCategoryLabel = item.category && (!prevItem || prevItem.category !== item.category);

          return (
            <MenuGroup key={index}>
              {showCategoryLabel && (
                <CategoryLabel $collapsed={collapsed}>{item.category}</CategoryLabel>
              )}
              {item.subItems ? (
                <>
                  <MenuButton
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSubmenu(item.title);
                    }}
                    className={isActive ? 'active' : ''}
                    $collapsed={collapsed}
                    title={collapsed ? `Click to expand ${item.title}` : ''}
                  >
                    <div className="menu-content">
                      <div className="menu-icon">{item.icon}</div>
                      <span className="menu-text">{item.title}</span>
                    </div>
                    <span className="arrow-icon">
                      {isOpen ? item.iconOpened : item.iconClosed}
                    </span>
                  </MenuButton>
                  <SubMenuContainer $isOpen={isOpen} $collapsed={collapsed}>
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
                </>
              ) : (
                <MenuLink
                  to={item.path}
                  className={isActive ? 'active' : ''}
                  $collapsed={collapsed}
                  title={collapsed ? item.title : ''}
                >
                  <div className="menu-content">
                    <div className="menu-icon">{item.icon}</div>
                    <span className="menu-text">{item.title}</span>
                  </div>
                </MenuLink>
              )}
            </MenuGroup>
          );
        })}
      </MenuSection>

      <LogoutSection>
        <LogoutButton $collapsed={collapsed} onClick={handleLogout} title={collapsed ? 'Logout' : ''}>
          <FiLogOut size={18} />
          <span className="logout-text">Logout</span>
        </LogoutButton>
        {!collapsed && (
          <div style={{
            marginTop: '8px',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.18)',
            fontFamily: 'var(--sonic-font-mono, monospace)',
            letterSpacing: '0.04em',
            paddingLeft: '12px'
          }}>
            MINSAT v3.0
          </div>
        )}
      </LogoutSection>
    </SidebarContainer>
  );
};

export default Sidebar;
