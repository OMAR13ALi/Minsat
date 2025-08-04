import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { AiFillQuestionCircle } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineRead } from "react-icons/ai";

import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
    title: 'Customer Care',
    path: '/',
    icon: <AiOutlineUser />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Account',
        path: '/customer/account',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'History',
        path: '/customer/msisdn-history',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Trace 4G',
        path: '/customer/trace-4G',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
    {
    title: 'Lookup Vouchers',
    path: '/',
    icon: <AiOutlineRead />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Serial Number',
        path: '/vs/serial-number',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Activation Code',
        path: '/vs/activation-code',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Help',
    path: '/',
    icon: <AiFillQuestionCircle />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'SC / DA Group / UA',
        path: '/help/scda',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Service Identifier',
        path: '/help/service',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Offer',
        path: '/help/offer',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Usage Counters',
        path: '/help/usage',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  }
];