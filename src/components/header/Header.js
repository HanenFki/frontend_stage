import React, { useEffect, useState } from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import UserPanel from '../user-panel/UserPanel';
import './Header.scss';
import NotificationIcon from '../notif/notification';
import { Template } from 'devextreme-react/core/template';
import { calculateRemainingBalances } from '../../pages/calculate leaves/calculateRemainingBalance';
import { initialLeaves } from '../../pages/Form/data';

export default function Header({ menuToggleEnabled, title, toggleMenu }) {
  const [remainingBalances, setRemainingBalances] = useState([]);

  useEffect(() => {
    // Calculate the remaining balances for the employee with ID 1
    const balances = calculateRemainingBalances(1, initialLeaves);
    setRemainingBalances(balances);
  }, []);

  return (
    <header className={'header-component'}>
      <Toolbar className={'header-toolbar'}>
        <Item
          visible={menuToggleEnabled}
          location={'before'}
          widget={'dxButton'}
          cssClass={'menu-button'}
        >
          <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
        </Item>
        <Item
          location={'before'}
          cssClass={'header-title'}
          text={title}
          visible={!!title}
        />
        <Item
          location={'after'}
          cssClass={'leave-balances'}
        >
          <div className={'leave-balances-container'}>
            {remainingBalances.map(type => (
              <span 
                key={type.id} 
                className={'leave-balance-item'} 
                style={{ 
                  backgroundColor: type.color, 
                  color: 'white',
                  marginRight: '10px', // Space between each balance
                  padding: '5px 10px', // Space inside each balance item
                  borderRadius: '4px' // Rounded corners
                }}
              >
                {type.name}: {type.remainingBalance}d
              </span>
            ))}
          </div>
        </Item>
        <Item
          location={'after'}
          cssClass={'notification-icon-container'}
        >
          <NotificationIcon count={3} />
        </Item>
        <Item
          location={'after'}
          locateInMenu={'auto'}
        >
          <Button
            className={'user-button authorization'}
            width={210}
            height={'100%'}
            stylingMode={'text'}
          >
            <UserPanel menuMode={'context'} />
          </Button>
        </Item>
        <Template name={'userPanelTemplate'}>
          <UserPanel menuMode={'list'} />
        </Template>
      </Toolbar>
    </header>
  );
}
