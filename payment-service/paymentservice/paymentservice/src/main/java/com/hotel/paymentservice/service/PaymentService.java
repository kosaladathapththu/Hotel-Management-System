package com.hotel.paymentservice.service;

import com.hotel.paymentservice.model.Payment;
import java.util.List;

public interface PaymentService {
    Payment createPayment(Payment payment);
    List<Payment> getAllPayments();
    Payment getPaymentById(Long id);
    Payment updatePaymentStatus(Long id, String status);
}
