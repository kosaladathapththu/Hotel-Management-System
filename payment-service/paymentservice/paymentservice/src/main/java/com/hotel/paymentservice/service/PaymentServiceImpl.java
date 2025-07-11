package com.hotel.paymentservice.service;

import com.hotel.paymentservice.model.Payment;
import com.hotel.paymentservice.model.PaymentStatus;
import com.hotel.paymentservice.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public Payment createPayment(Payment payment) {
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setPaymentDate(LocalDateTime.now());
        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    @Override
    public Payment updatePaymentStatus(Long id, String status) {
        Payment payment = getPaymentById(id);
        if (payment != null) {
            payment.setPaymentStatus(PaymentStatus.valueOf(status.toUpperCase()));
            return paymentRepository.save(payment);
        }
        return null;
    }
}
