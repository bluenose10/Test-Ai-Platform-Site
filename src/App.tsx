/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LandingPage } from './components/LandingPage';
import { AIAssistant } from './components/AIAssistant';

export default function App() {
  return (
    <div className="min-h-screen font-sans text-slate-200 bg-[#0A0B0E] relative overflow-x-hidden flex flex-col">
      <LandingPage />
      <AIAssistant />
    </div>
  );
}
