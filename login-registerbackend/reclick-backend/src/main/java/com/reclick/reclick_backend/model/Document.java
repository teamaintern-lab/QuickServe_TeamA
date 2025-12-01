package com.reclick.reclick_backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "document")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doc_id")
    private Integer docId;

    @Column(name = "customer_id", nullable = false)
    private Integer customerId; // keep FK as id - we keep simple mapping

    @Column(name = "file_path", length = 255, nullable = false)
    private String filePath;

    @Column(name = "print_options", columnDefinition = "jsonb")
    private String printOptions;

    @Column(name = "uploaded_at")
    private LocalDateTime uploadedAt;

    // getters / setters
    public Integer getDocId() { return docId; }
    public void setDocId(Integer docId) { this.docId = docId; }
    public Integer getCustomerId() { return customerId; }
    public void setCustomerId(Integer customerId) { this.customerId = customerId; }
    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }
    public String getPrintOptions() { return printOptions; }
    public void setPrintOptions(String printOptions) { this.printOptions = printOptions; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
}
