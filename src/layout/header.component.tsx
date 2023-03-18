import { FC, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { AppConfig } from '~/app/useAppConfig';
import { LanguageSwitcher } from '~/i18n/language-switcher.component';
import { ThemeSwitcher } from '~/theme/theme-switcher.component';

interface Props {
  appConfig: AppConfig | undefined;
}

const Header: FC<Props> = ({ appConfig }): ReactElement => {
  const { t } = useTranslation();
  return (
    <header className="header flex justify-between p-10">
      <span className="font-bold">{t('greeting')} User</span>
      {appConfig ? <span>{appConfig.name}</span> : null}
      <span className="flex items-center justify-between">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </span>
    </header>
  );
};

export default Header;
