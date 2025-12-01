-- V1__initial_schema.sql
-- Initial schema for ReClick (converted from dump)
-- Created: 2025-11-11

-- Sequences
CREATE SEQUENCE IF NOT EXISTS public."Order_order_id_seq" AS integer START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE IF NOT EXISTS public.admin_admin_id_seq AS integer START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE IF NOT EXISTS public.customer_customer_id_seq AS integer START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE IF NOT EXISTS public.document_doc_id_seq AS integer START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE IF NOT EXISTS public.employee_empid_seq AS integer START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE IF NOT EXISTS public.payment_payment_id_seq AS integer START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE IF NOT EXISTS public.service_service_id_seq AS integer START WITH 1 INCREMENT BY 1 CACHE 1;

-- Tables
CREATE TABLE IF NOT EXISTS public.admin (
    admin_id integer NOT NULL,
    name character varying(100) NOT NULL,
    adm_email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.customer (
    customer_id integer NOT NULL,
    name character varying(100) NOT NULL,
    cus_email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    contact_no character varying(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.service (
    service_id integer NOT NULL,
    name character varying(100) NOT NULL,
    price numeric(10,2) NOT NULL,
    time_per_unit numeric(5,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.customer_service (
    customer_id integer NOT NULL,
    service_id integer NOT NULL
);

CREATE TABLE IF NOT EXISTS public.document (
    doc_id integer NOT NULL,
    customer_id integer NOT NULL,
    file_path character varying(255) NOT NULL,
    print_options jsonb,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.employee (
    empid integer NOT NULL,
    name character varying(100) NOT NULL,
    emp_email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    phone_no character varying(15) NOT NULL,
    address character varying(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS public."Order" (
    order_id integer NOT NULL,
    doc_id integer NOT NULL,
    customer_id integer NOT NULL,
    empid integer,
    status character varying(20) DEFAULT 'pending',
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_status_check" CHECK (status IN ('pending','accepted','confirmed','paid','completed','collected'))
);

CREATE TABLE IF NOT EXISTS public.order_service (
    order_id integer NOT NULL,
    service_id integer NOT NULL
);

CREATE TABLE IF NOT EXISTS public.payment (
    payment_id integer NOT NULL,
    order_id integer NOT NULL,
    payment_screenshot character varying(255),
    receipt_code character(6),
    paid_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- Sequence ownership (connect sequences to columns)
ALTER SEQUENCE public."Order_order_id_seq" OWNED BY public."Order".order_id;
ALTER SEQUENCE public.admin_admin_id_seq OWNED BY public.admin.admin_id;
ALTER SEQUENCE public.customer_customer_id_seq OWNED BY public.customer.customer_id;
ALTER SEQUENCE public.document_doc_id_seq OWNED BY public.document.doc_id;
ALTER SEQUENCE public.employee_empid_seq OWNED BY public.employee.empid;
ALTER SEQUENCE public.payment_payment_id_seq OWNED BY public.payment.payment_id;
ALTER SEQUENCE public.service_service_id_seq OWNED BY public.service.service_id;

-- Default values using sequences
ALTER TABLE ONLY public.admin ALTER COLUMN admin_id SET DEFAULT nextval('public.admin_admin_id_seq'::regclass);
ALTER TABLE ONLY public.customer ALTER COLUMN customer_id SET DEFAULT nextval('public.customer_customer_id_seq'::regclass);
ALTER TABLE ONLY public.document ALTER COLUMN doc_id SET DEFAULT nextval('public.document_doc_id_seq'::regclass);
ALTER TABLE ONLY public.employee ALTER COLUMN empid SET DEFAULT nextval('public.employee_empid_seq'::regclass);
ALTER TABLE ONLY public.payment ALTER COLUMN payment_id SET DEFAULT nextval('public.payment_payment_id_seq'::regclass);
ALTER TABLE ONLY public.service ALTER COLUMN service_id SET DEFAULT nextval('public.service_service_id_seq'::regclass);
ALTER TABLE ONLY public."Order" ALTER COLUMN order_id SET DEFAULT nextval('public."Order_order_id_seq"'::regclass);

-- Primary keys
ALTER TABLE ONLY public.admin ADD CONSTRAINT admin_pkey PRIMARY KEY (admin_id);
ALTER TABLE ONLY public.customer ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);
ALTER TABLE ONLY public.service ADD CONSTRAINT service_pkey PRIMARY KEY (service_id);
ALTER TABLE ONLY public.document ADD CONSTRAINT document_pkey PRIMARY KEY (doc_id);
ALTER TABLE ONLY public.employee ADD CONSTRAINT employee_pkey PRIMARY KEY (empid);
ALTER TABLE ONLY public."Order" ADD CONSTRAINT "Order_pkey" PRIMARY KEY (order_id);
ALTER TABLE ONLY public.payment ADD CONSTRAINT payment_pkey PRIMARY KEY (payment_id);
ALTER TABLE ONLY public.customer_service ADD CONSTRAINT customer_service_pkey PRIMARY KEY (customer_id, service_id);
ALTER TABLE ONLY public.order_service ADD CONSTRAINT order_service_pkey PRIMARY KEY (order_id, service_id);

-- Unique constraints
ALTER TABLE ONLY public.admin ADD CONSTRAINT admin_adm_email_key UNIQUE (adm_email);
ALTER TABLE ONLY public.customer ADD CONSTRAINT customer_cus_email_key UNIQUE (cus_email);
ALTER TABLE ONLY public.employee ADD CONSTRAINT employee_emp_email_key UNIQUE (emp_email);
ALTER TABLE ONLY public.payment ADD CONSTRAINT payment_receipt_code_key UNIQUE (receipt_code);

-- Foreign keys
ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id) ON DELETE CASCADE;

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_doc_id_fkey" FOREIGN KEY (doc_id) REFERENCES public.document(doc_id) ON DELETE CASCADE;

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_empid_fkey" FOREIGN KEY (empid) REFERENCES public.employee(empid) ON DELETE SET NULL;

ALTER TABLE ONLY public.customer_service
    ADD CONSTRAINT customer_service_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id) ON DELETE CASCADE;

ALTER TABLE ONLY public.customer_service
    ADD CONSTRAINT customer_service_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.service(service_id);

ALTER TABLE ONLY public.document
    ADD CONSTRAINT document_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id) ON DELETE CASCADE;

ALTER TABLE ONLY public.order_service
    ADD CONSTRAINT order_service_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."Order"(order_id) ON DELETE CASCADE;

ALTER TABLE ONLY public.order_service
    ADD CONSTRAINT order_service_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.service(service_id);

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."Order"(order_id) ON DELETE CASCADE;
