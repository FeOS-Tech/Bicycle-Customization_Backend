const customerOrderConfirmation = (order, customization, userDetails,payment) => {
  let count = 0;
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
        }
        .email-container {
          max-width: 100%;
          width: 100%;
          margin: 0 auto;
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
        }
        
        /* Mobile: 100% width (default) */
        @media only screen and (max-width: 767px) {
          .email-container {
            width: 100% !important;
            max-width: 100% !important;
          }
          body {
            padding: 10px;
          }
          .col-6 {
            width: 100% !important;
            display: block !important;
          }
        }
        
        /* Tablet: 70% width */
        @media only screen and (min-width: 768px) and (max-width: 1024px) {
          .email-container {
            width: 70% !important;
            max-width: 70% !important;
          }
        }
        
        /* Laptop and Desktop: 50% width (centered) */
        @media only screen and (min-width: 1025px) {
          .email-container {
            width: 50% !important;
            max-width: 600px !important;
          }
        }
        
        .header-table {
          width: 100%;
          background-color: #f5f5f5;
          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
        }
        .logo-image {
          max-width: 150px;
          height: auto;
        }
        .header-date {
          font-size: 12px;
          color: #666;
          text-align: right;
        }
        .title-section {
          background-color: white;
          padding: 10px 20px;
          border-bottom: 1px solid #e0e0e0;
        }
        .title {
          font-size: 20px;
          font-weight: 600;
          color: rgb(134, 188, 34);
          margin-bottom: 5px;
        }
        .subtitle {
          font-size: 12px;
          color: #999;
        }
        .details-section {
          background-color: #f5f5f5;
          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
        }
        .section-title {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 12px;
        }
        .detail-table {
          width: 100%;
          border-collapse: collapse;
        }
        .detail-table tr {
          border-bottom: 1px solid #e8e8e8;
        }
        .detail-table tr:last-child {
          border-bottom: none;
        }
        .detail-table td {
          padding: 5px 0;
          font-size: 14px;
        }
        .detail-label {
          color: #666;
          width: 50%;
          text-align: left;
        }
        .detail-value {
          color: #333;
          font-weight: 500;
          width: 50%;
          text-align: right;
        }
        .total-section {
          background-color: white;
          padding: 10px 20px;
          text-align: center;
          border-bottom: 3px solid #e0e0e0;
        }
        .total-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }
        .total-amount {
          font-size: 32px;
          font-weight: 700;
          color: #333;
        }
        .col-6 {
          width: 50%;
          display: inline-block;
          vertical-align: top;
          padding: 0 10px;
        }
        .col-section {
          background-color: white;
          padding: 15px;
          border-radius: 5px;
          height: 100%;
        }
        .col-title {
          font-size: 13px;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e8e8e8;
        }
        .col-detail-table {
          width: 100%;
          border-collapse: collapse;
        }
        .col-detail-table tr {
          border-bottom: 1px solid #f0f0f0;
        }
        .col-detail-table tr:last-child {
          border-bottom: none;
        }
        .col-detail-table td {
          padding: 8px 0;
          font-size: 13px;
        }
        .col-detail-label {
          color: #666;
          text-align: left;
        }
        .col-detail-value {
          color: #333;
          font-weight: 500;
          text-align: right;
        }
        .footer {
          background-color: #f5f5f5;
          padding: 25px 20px;
          text-align: center;
          border-top: 1px solid #e0e0e0;
        }
        .footer-text {
          font-size: 12px;
          color: #999;
          line-height: 1.5;
        }
        .thank-you {
          font-size: 13px;
          color: #666;
          margin-top: 15px;
        }
        
        /* Responsive font sizes */
        @media only screen and (max-width: 480px) {
          .title {
            font-size: 18px;
          }
          .total-amount {
            font-size: 28px;
          }
          .detail-table td {
            font-size: 13px;
          }
        }
      </style>
    </head>
    <body>
      <table class="email-container" cellpadding="0" cellspacing="0">
        <!-- Header with Logo -->
        <tr>
          <td>
            <table class="header-table" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width: 50%;">
                  <img src="https://customize.trackandtrail.in/logo.png" alt="Track & Trail" style="max-width: 150px; height: auto;" />
                </td>
                <td style="width: 50%;">
                  <div class="header-date">${new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Title Section -->
        <tr>
          <td>
            <div class="title-section">
              <div class="title">Order Confirmation</div>
              <div class="subtitle">Your custom cycle order has been placed successfully</div>
            </div>
          </td>
        </tr>

        <!-- Order Details -->
        <tr>
          <td>
            <div class="details-section">
              <table class="detail-table" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="detail-label">Invoice ID</td>
                  <td class="detail-value">#${order.invoiceNumber || order._id}</td>
                </tr>
                <tr>
                  <td class="detail-label">Invoice Date</td>
                  <td class="detail-value">${new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                </tr>
                <tr>
                  <td class="detail-label">Transaction ID</td>
                  <td class="detail-value">${payment.transactionId || order.paymentId || 'N/A'}</td>
                </tr>
                <tr>
                  <td class="detail-label">Job ID</td>
                  <td class="detail-value">#${customization.customization_number}</td>
                </tr>
              </table>
            </div>
          </td>
        </tr>

        <!-- Total Amount Section -->
        <tr>
          <td>
            <div class="total-section">
              <div class="total-label">Total</div>
              <div class="total-amount">₹ ${order.amount.toFixed(2)}</div>
            </div>
          </td>
        </tr>

        <!-- Cycle Details -->
        <tr>
          <td>
            <div class="details-section">
              <div class="section-title">Cycle Details</div>
              <table class="detail-table" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="detail-label">Model</td>
                  <td class="detail-value">${customization.cycleName || '-'}</td>
                </tr>
                <tr>
                  <td class="detail-label">Theme Type</td>
                  <td class="detail-value">${customization.themeName || 'Standard'}</td>
                </tr>
                <tr>
                  <td class="detail-label">Brand</td>
                  <td class="detail-value">${customization.brand || 'Track & Trail'}</td>
                </tr>
                <tr>
                  <td class="detail-label">Type</td>
                  <td class="detail-value">${customization.mode
                    ? customization.mode.charAt(0).toUpperCase() + customization.mode.slice(1).toLowerCase()
                    : '-'}
                  </td>
                </tr>
                <tr>
                  <td class="detail-label">Size</td>
                  <td class="detail-value">${customization.bikeSize || 'Medium'}</td>
                </tr>
                <tr>
                  <td class="detail-label">Name</td>
                  <td class="detail-value">${customization.userName || '-'}</td>
                </tr>
                <tr>
                  <td class="detail-label">Tag Line</td>
                  <td class="detail-value">${customization.tagline || '-'}</td>
                </tr>
              </table>
            </div>
          </td>
        </tr>

        <!-- Two Column Section: Parts & Stickers -->
        <tr>
          <td>
            <div class="details-section">
              <table cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr>
                  <!-- Left Column: Parts -->
                  <td class="col-6">
                    <div class="col-section">
                      <div class="col-title">Parts</div>
                      <table class="col-detail-table" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="col-detail-label">Frame Color</td>
                          <td class="col-detail-value">${customization.selectedParts.frame.colorName}</td>
                        </tr>
                        <tr>
                          <td class="col-detail-label">Brake Lever</td>
                          <td class="col-detail-value">${customization.selectedParts.breaklever.colorName}</td>
                        </tr>
                        <tr>
                          <td class="col-detail-label">Grip Color</td>
                          <td class="col-detail-value">${customization.selectedParts.grip.colorName}</td>
                        </tr>
                        <tr>
                          <td class="col-detail-label">Mudguard</td>
                          <td class="col-detail-value">${customization.selectedParts.mudguard.colorName}</td>
                        </tr>
                        <tr>
                          <td class="col-detail-label">Mudguard</td>
                          <td class="col-detail-value">${customization.selectedParts.mudguard.colorName}</td>
                        </tr>
                        ${customization.mode === 'fun' ? `
                          <tr>
                            <td class="col-detail-label">Basket</td>
                            <td class="col-detail-value">
                              ${customization.selectedParts?.basket?.colorName || '-'}
                            </td>
                          </tr>
                          <tr>
                            <td class="col-detail-label">Backrest</td>
                            <td class="col-detail-value">
                              ${customization.selectedParts?.backrest?.colorName || '-'}
                            </td>
                          </tr>
                        ` : ''}
                      </table>
                    </div>
                  </td>
                  
                  <!-- Right Column: Stickers -->
                  <td class="col-6">
                    <div class="col-section">
                      <div class="col-title">Stickers</div>
                      <table class="col-detail-table" cellpadding="0" cellspacing="0">
                        ${
                          customization.stickersRaw.isBaseStickerColorAllowed ? 
                          `<tr>
                            <td class="col-detail-label">Variant ${++count}</td>
                            <td class="col-detail-value">${customization.stickerColors.baseHex || 'Original'}</td>
                          </tr>`:''
                        }
                        ${
                          customization.stickersRaw.isPaintStickerColorAllowed ? 
                          `<tr>
                            <td class="col-detail-label">Variant ${++count}</td>
                            <td class="col-detail-value">${customization.stickerColors.paintHex || 'Original'}</td>
                          </tr>`:''
                        }
                        ${
                          customization.stickersRaw.isDecalStickerColorAllowed ?
                        `<tr>
                          <td class="col-detail-label">Variant ${++count}</td>
                          <td class="col-detail-value">${customization.stickerColors.decalHex || 'Original'}</td>
                        </tr>`:''
                        }
                        ${
                          customization.stickersRaw.isPrimaryStickerColorAllowed ?
                          `<tr>
                            <td class="col-detail-label">Variant ${++count}</td>
                            <td class="col-detail-value">${customization.stickerColors.primaryHex || 'Original'}</td>
                          </tr>`:''
                        }
                        ${
                          customization.stickersRaw.isSecondaryStickerColorAllowed ?
                          `<tr>
                            <td class="col-detail-label">Variant ${++count}</td>
                            <td class="col-detail-value">${customization.stickerColors.secondaryHex || 'Original'}</td>
                          </tr>`:''
                        }
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td>
            <div class="footer">
              <img src="https://customize.trackandtrail.in/logo.png" alt="Track & Trail" style="max-width: 150px; height: auto;" />
              <div class="footer-text">
                Thank you for choosing Track & Trail<br>
                We'll begin working on your custom cycle right away
              </div>
              <div class="thank-you">
                Questions? Contact us at support@trackandtrail.in
              </div>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

module.exports = customerOrderConfirmation;