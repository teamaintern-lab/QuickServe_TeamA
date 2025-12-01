package com.reclick.reclick_backend.model;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Integer paymentId;

    @Column(name = "order_id", nullable = false)
    private Integer orderId;

    @Column(name = "payment_screenshot", length = 255)
    private String paymentScreenshot;

    @Column(name = "receipt_code", length = 6, unique = true)
    private String receiptCode;

    @Column(name = "paid_at")
    private LocalDateTime paidAt;

    // getters / setters
    public Integer getPaymentId() { return paymentId; }
    public void setPaymentId(Integer paymentId) { this.paymentId = paymentId; }
    public Integer getOrderId() { return orderId; }
    public void setOrderId(Integer orderId) { this.orderId = orderId; }
    public String getPaymentScreenshot() { return paymentScreenshot; }
    public void setPaymentScreenshot(String paymentScreenshot) { this.paymentScreenshot = paymentScreenshot; }
    public String getReceiptCode() { return receiptCode; }
    public void setReceiptCode(String receiptCode) { this.receiptCode = receiptCode; }
    public LocalDateTime getPaidAt() { return paidAt; }
    public void setPaidAt(LocalDateTime paidAt) { this.paidAt = paidAt; }
}
