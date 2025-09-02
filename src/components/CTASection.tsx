import React from 'react'
import { ExternalLink } from 'lucide-react'
import './CTASection.scss'

const CTASection: React.FC = () => {
  return (
    <div className="cta-section">
      <div className="cta-banner">
        <span className="cta-label">Best Overall Tax Software</span>
        <span className="ad-label">AD</span>
      </div>
      
      <div className="cta-content">
        <div className="cta-logo">
          <h3>INTUIT TURBOTAX</h3>
        </div>
        
        <div className="cta-rating">
          <span className="rating">5.0</span>
          <span className="rating-label">NerdWallet rating</span>
        </div>
        
        <button className="cta-button">
          START NOW
          <ExternalLink size={16} />
        </button>
        
        <div className="cta-details">
          <ul>
            <li><strong>Federal:</strong> $79 to $139. Free version available for Simple Form 1040 returns only.</li>
            <li><strong>State:</strong> $0 to $69 per state.</li>
            <li>Expert help or full service filing is available with an upgrade to Live packages for a fee.</li>
          </ul>
        </div>
        
        <div className="cta-disclosures">
          <p><strong>Disclosures:</strong> TurboTax Free Edition is available for simple Form 1040 returns only. Not all taxpayers qualify. See TurboTax.com for details.</p>
        </div>
      </div>
    </div>
  )
}

export default CTASection
