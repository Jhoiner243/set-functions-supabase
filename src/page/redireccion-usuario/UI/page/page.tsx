/* eslint-disable react/react-in-jsx-scope */
import { RedirectProviderContext } from '@/page/redireccion-usuario/context/redireccion-context';
import { PlaceholdersAndVanishInputDemo } from '../components/placeholder';
import { TextGenerateEffectDemo } from '../components/text-generative';


export default function BusquedaIndexada() {
  return (
      <RedirectProviderContext>
        <div>
          <div className='mb-0'>
        <PlaceholdersAndVanishInputDemo />
          </div>
        <div className='top-0'>
        <TextGenerateEffectDemo/>
        </div>

        </div>
      </RedirectProviderContext>
  )
}
