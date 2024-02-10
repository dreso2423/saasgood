--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Homebrew)
-- Dumped by pg_dump version 14.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: account_type_enum; Type: TYPE; Schema: public; Owner: andre
--

CREATE TYPE public.account_type_enum AS ENUM (
    'free',
    'paid'
);


ALTER TYPE public.account_type_enum OWNER TO andre;

--
-- Name: authentication_method_enum; Type: TYPE; Schema: public; Owner: andre
--

CREATE TYPE public.authentication_method_enum AS ENUM (
    'api_key',
    'oauth'
);


ALTER TYPE public.authentication_method_enum OWNER TO andre;

--
-- Name: data_source_type_enum; Type: TYPE; Schema: public; Owner: andre
--

CREATE TYPE public.data_source_type_enum AS ENUM (
    'crm',
    'advertising_platform',
    'marketing_tool',
    'cdp'
);


ALTER TYPE public.data_source_type_enum OWNER TO andre;

--
-- Name: role_enum; Type: TYPE; Schema: public; Owner: andre
--

CREATE TYPE public.role_enum AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.role_enum OWNER TO andre;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ad_sets; Type: TABLE; Schema: public; Owner: andre
--

CREATE TABLE public.ad_sets (
    id character(36) NOT NULL,
    campaign_id character(36) NOT NULL,
    name character varying(255) NOT NULL,
    targeting_criteria json,
    budget numeric(10,2),
    performance_metrics_json json,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.ad_sets OWNER TO andre;

--
-- Name: ads; Type: TABLE; Schema: public; Owner: andre
--

CREATE TABLE public.ads (
    id character(36) NOT NULL,
    ad_set_id character(36) NOT NULL,
    creative_type character varying(255) NOT NULL,
    landing_page_url character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.ads OWNER TO andre;

--
-- Name: campaigns; Type: TABLE; Schema: public; Owner: andre
--

CREATE TABLE public.campaigns (
    id character(36) NOT NULL,
    data_source_id character(36) NOT NULL,
    name character varying(255) NOT NULL,
    start_date date NOT NULL,
    end_date date,
    budget numeric(10,2),
    objective character varying(255),
    performance_metrics_json json,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.campaigns OWNER TO andre;

--
-- Name: company_id_seq; Type: SEQUENCE; Schema: public; Owner: andre
--

CREATE SEQUENCE public.company_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.company_id_seq OWNER TO andre;

--
-- Name: company; Type: TABLE; Schema: public; Owner: andre
--

CREATE TABLE public.company (
    id character(36) DEFAULT nextval('public.company_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255),
    phone_number character varying(20),
    account_type public.account_type_enum NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.company OWNER TO andre;

--
-- Name: connections; Type: TABLE; Schema: public; Owner: andre
--

CREATE TABLE public.connections (
    id character(36) NOT NULL,
    company_id character(36) NOT NULL,
    data_source_id character(36) NOT NULL,
    access_token character varying(255),
    refresh_token character varying(255),
    last_synchronized_timestamp date,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.connections OWNER TO andre;

--
-- Name: conversion; Type: TABLE; Schema: public; Owner: andre
--

CREATE TABLE public.conversion (
    id character(36) NOT NULL,
    event_id character(36) NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    type character varying(255) NOT NULL,
    value numeric(10,2),
    revenue_generated numeric(10,2),
    cost_per_acquisition numeric(10,2),
    lifetime_value numeric(10,2),
    conversion_path json,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.conversion OWNER TO andre;

--
-- Name: data_sources; Type: TABLE; Schema: public; Owner: andre
--

CREATE TABLE public.data_sources (
    id character(36) NOT NULL,
    name character varying(255) NOT NULL,
    type public.data_source_type_enum NOT NULL,
    api_documentation_url character varying(255),
    authentication_method public.authentication_method_enum,
    platform_specific_config json,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.data_sources OWNER TO andre;

--
-- Name: events; Type: TABLE; Schema: public; Owner: andre
--

CREATE TABLE public.events (
    id character(36) NOT NULL,
    type character varying(255) NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    data_source_id character(36) NOT NULL,
    connection_id character(36) NOT NULL,
    campaign_id character(36),
    ad_set_id character(36),
    ad_id character(36),
    platform_specific_tracking_ids json,
    additional_event_data json,
    user_id character(36),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.events OWNER TO andre;

--
-- Name: users; Type: TABLE; Schema: public; Owner: andre
--

CREATE TABLE public.users (
    id character(36) DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    email_address character varying(255),
    company_id character(36) NOT NULL,
    role public.role_enum NOT NULL,
    hashed_password character varying(255) NOT NULL,
    api_key character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO andre;

--
-- Name: ad_sets ad_sets_pkey; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.ad_sets
    ADD CONSTRAINT ad_sets_pkey PRIMARY KEY (id);


--
-- Name: ads ads_pkey; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_pkey PRIMARY KEY (id);


--
-- Name: campaigns campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (id);


--
-- Name: company company_email_key; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_email_key UNIQUE (email);


--
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- Name: connections connections_pkey; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.connections
    ADD CONSTRAINT connections_pkey PRIMARY KEY (id);


--
-- Name: conversion conversion_pkey; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.conversion
    ADD CONSTRAINT conversion_pkey PRIMARY KEY (id);


--
-- Name: data_sources data_sources_pkey; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.data_sources
    ADD CONSTRAINT data_sources_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: users users_api_key_key; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_api_key_key UNIQUE (api_key);


--
-- Name: users users_email_address_key; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_address_key UNIQUE (email_address);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ad_sets ad_sets_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.ad_sets
    ADD CONSTRAINT ad_sets_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id);


--
-- Name: ads ads_ad_set_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_ad_set_id_fkey FOREIGN KEY (ad_set_id) REFERENCES public.ad_sets(id);


--
-- Name: campaigns campaigns_data_source_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_data_source_id_fkey FOREIGN KEY (data_source_id) REFERENCES public.data_sources(id);


--
-- Name: connections connections_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.connections
    ADD CONSTRAINT connections_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- Name: connections connections_data_source_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.connections
    ADD CONSTRAINT connections_data_source_id_fkey FOREIGN KEY (data_source_id) REFERENCES public.data_sources(id);


--
-- Name: conversion conversion_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.conversion
    ADD CONSTRAINT conversion_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id);


--
-- Name: events events_ad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_ad_id_fkey FOREIGN KEY (ad_id) REFERENCES public.ads(id);


--
-- Name: events events_ad_set_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_ad_set_id_fkey FOREIGN KEY (ad_set_id) REFERENCES public.ad_sets(id);


--
-- Name: events events_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id);


--
-- Name: events events_connection_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_connection_id_fkey FOREIGN KEY (connection_id) REFERENCES public.connections(id);


--
-- Name: events events_data_source_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_data_source_id_fkey FOREIGN KEY (data_source_id) REFERENCES public.data_sources(id);


--
-- Name: events events_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: users users_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- PostgreSQL database dump complete
--

