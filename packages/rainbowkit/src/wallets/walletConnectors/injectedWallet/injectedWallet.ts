/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface InjectedWalletOptions {
  chains: Chain[];
}

export const injectedWallet = ({ chains }: InjectedWalletOptions): Wallet => ({
  id: 'injected',
  name: 'Browser Wallet',
  iconUrl: async () => (await import('./injectedWallet.svg')).default,
  iconBackground: '#fff',
  hidden: ({ wallets }) =>
    wallets.some(
      wallet =>
        wallet.installed &&
        wallet.name === wallet.connector.name &&
        (wallet.connector instanceof InjectedConnector ||
          wallet.id === 'coinbase')
    ),
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
    }),
  }),
});
