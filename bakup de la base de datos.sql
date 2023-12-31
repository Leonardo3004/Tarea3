PGDMP                  
    {            tarea3    16.0    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16629    tarea3    DATABASE     y   CREATE DATABASE tarea3 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE tarea3;
                postgres    false            �            1259    16631    clientes    TABLE     �   CREATE TABLE public.clientes (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    cedula integer NOT NULL,
    correo character varying(255),
    telefono character varying(20)
);
    DROP TABLE public.clientes;
       public         heap    postgres    false            �            1259    16630    clientes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.clientes_id_seq;
       public          postgres    false    216            �           0    0    clientes_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;
          public          postgres    false    215            �            1259    16672    facturas    TABLE     �   CREATE TABLE public.facturas (
    id integer NOT NULL,
    numerofactura integer NOT NULL,
    fecha character varying(20) NOT NULL,
    clienteid integer NOT NULL,
    total numeric(10,2) NOT NULL
);
    DROP TABLE public.facturas;
       public         heap    postgres    false            �            1259    16671    facturas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.facturas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.facturas_id_seq;
       public          postgres    false    220            �           0    0    facturas_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.facturas_id_seq OWNED BY public.facturas.id;
          public          postgres    false    219            �            1259    16640 	   productos    TABLE     �   CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    precio numeric(10,2) NOT NULL,
    stock integer NOT NULL
);
    DROP TABLE public.productos;
       public         heap    postgres    false            �            1259    16639    productos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.productos_id_seq;
       public          postgres    false    218            �           0    0    productos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;
          public          postgres    false    217            $           2604    16634    clientes id    DEFAULT     j   ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);
 :   ALTER TABLE public.clientes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            &           2604    16675    facturas id    DEFAULT     j   ALTER TABLE ONLY public.facturas ALTER COLUMN id SET DEFAULT nextval('public.facturas_id_seq'::regclass);
 :   ALTER TABLE public.facturas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            %           2604    16643    productos id    DEFAULT     l   ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);
 ;   ALTER TABLE public.productos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �          0    16631    clientes 
   TABLE DATA           H   COPY public.clientes (id, nombre, cedula, correo, telefono) FROM stdin;
    public          postgres    false    216   ~       �          0    16672    facturas 
   TABLE DATA           N   COPY public.facturas (id, numerofactura, fecha, clienteid, total) FROM stdin;
    public          postgres    false    220   �       �          0    16640 	   productos 
   TABLE DATA           >   COPY public.productos (id, nombre, precio, stock) FROM stdin;
    public          postgres    false    218   �       �           0    0    clientes_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.clientes_id_seq', 3, true);
          public          postgres    false    215            �           0    0    facturas_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.facturas_id_seq', 30, true);
          public          postgres    false    219            �           0    0    productos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.productos_id_seq', 7, true);
          public          postgres    false    217            (           2606    16638    clientes clientes_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.clientes DROP CONSTRAINT clientes_pkey;
       public            postgres    false    216            ,           2606    16677    facturas facturas_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.facturas DROP CONSTRAINT facturas_pkey;
       public            postgres    false    220            *           2606    16645    productos productos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_pkey;
       public            postgres    false    218            -           2606    16678     facturas facturas_clienteid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_clienteid_fkey FOREIGN KEY (clienteid) REFERENCES public.clientes(id);
 J   ALTER TABLE ONLY public.facturas DROP CONSTRAINT facturas_clienteid_fkey;
       public          postgres    false    216    220    4648            �   f   x�3��*M�S8��(����������3(�Z��[�������ijj����sq�&^���sxsAj1���������!gnbQf"�F��.HW� �!�      �   �   x�}�1� k�
� ���'R�L�:U��,<�ءtw�2J�����y&t��#B6Uv����R��z�d�v�@ReA/*�ɼˬ���h94���<����M2��p��(̝ku��s��>ũ�j��,.]X��|��`st�r�������䲡؂uU���fXlͺ�_zx ���o�      �   �   x�%�M�0F�3����8KÚĵq3b��m��}8�G�b6���{_��\�65�-˾�����3��-�$H��y��cv�J�?=��ɗd��r�@�`��Z�}�n�3�&`�X旀!RD��Q�(�K6�C��
�7-�     