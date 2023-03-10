PGDMP     "                    {            testbackend    14.7 (Debian 14.7-1.pgdg110+1)    14.7                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16384    testbackend    DATABASE     _   CREATE DATABASE testbackend WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
    DROP DATABASE testbackend;
                postgres    false            ?            1259    16385    ticket    TABLE     R  CREATE TABLE public.ticket (
    ticketid integer NOT NULL,
    created_date timestamp without time zone,
    userid integer NOT NULL,
    description text NOT NULL,
    filepath text,
    attention integer,
    solved character varying(1) DEFAULT 'N'::character varying,
    active character varying(1) DEFAULT 'Y'::character varying
);
    DROP TABLE public.ticket;
       public         heap    postgres    false            ?            1259    16392    ticket_ticketid_seq    SEQUENCE     ?   CREATE SEQUENCE public.ticket_ticketid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.ticket_ticketid_seq;
       public          postgres    false    209                       0    0    ticket_ticketid_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.ticket_ticketid_seq OWNED BY public.ticket.ticketid;
          public          postgres    false    210            ?            1259    16393    ticketcomments    TABLE     ?   CREATE TABLE public.ticketcomments (
    ticketcommentid integer NOT NULL,
    ticketid integer NOT NULL,
    created_date timestamp without time zone,
    userid integer NOT NULL,
    commentary text NOT NULL,
    filepath text
);
 "   DROP TABLE public.ticketcomments;
       public         heap    postgres    false            ?            1259    16398 "   ticketcomments_ticketcommentid_seq    SEQUENCE     ?   CREATE SEQUENCE public.ticketcomments_ticketcommentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.ticketcomments_ticketcommentid_seq;
       public          postgres    false    211                       0    0 "   ticketcomments_ticketcommentid_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.ticketcomments_ticketcommentid_seq OWNED BY public.ticketcomments.ticketcommentid;
          public          postgres    false    212            ?            1259    16399    usuario    TABLE     X  CREATE TABLE public.usuario (
    userid integer NOT NULL,
    name text NOT NULL,
    lastname text NOT NULL,
    email character varying(100),
    company text,
    phone text NOT NULL,
    password text NOT NULL,
    role character varying(1) DEFAULT 'C'::character varying,
    active character varying(1) DEFAULT 'Y'::character varying
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            ?            1259    16406    usuario_userid_seq    SEQUENCE     ?   CREATE SEQUENCE public.usuario_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.usuario_userid_seq;
       public          postgres    false    213                       0    0    usuario_userid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.usuario_userid_seq OWNED BY public.usuario.userid;
          public          postgres    false    214            k           2604    16407    ticket ticketid    DEFAULT     r   ALTER TABLE ONLY public.ticket ALTER COLUMN ticketid SET DEFAULT nextval('public.ticket_ticketid_seq'::regclass);
 >   ALTER TABLE public.ticket ALTER COLUMN ticketid DROP DEFAULT;
       public          postgres    false    210    209            l           2604    16408    ticketcomments ticketcommentid    DEFAULT     ?   ALTER TABLE ONLY public.ticketcomments ALTER COLUMN ticketcommentid SET DEFAULT nextval('public.ticketcomments_ticketcommentid_seq'::regclass);
 M   ALTER TABLE public.ticketcomments ALTER COLUMN ticketcommentid DROP DEFAULT;
       public          postgres    false    212    211            o           2604    16409    usuario userid    DEFAULT     p   ALTER TABLE ONLY public.usuario ALTER COLUMN userid SET DEFAULT nextval('public.usuario_userid_seq'::regclass);
 =   ALTER TABLE public.usuario ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    214    213                      0    16385    ticket 
   TABLE DATA           r   COPY public.ticket (ticketid, created_date, userid, description, filepath, attention, solved, active) FROM stdin;
    public          postgres    false    209   J                 0    16393    ticketcomments 
   TABLE DATA           o   COPY public.ticketcomments (ticketcommentid, ticketid, created_date, userid, commentary, filepath) FROM stdin;
    public          postgres    false    211                     0    16399    usuario 
   TABLE DATA           h   COPY public.usuario (userid, name, lastname, email, company, phone, password, role, active) FROM stdin;
    public          postgres    false    213   4!                  0    0    ticket_ticketid_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.ticket_ticketid_seq', 10, true);
          public          postgres    false    210                       0    0 "   ticketcomments_ticketcommentid_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.ticketcomments_ticketcommentid_seq', 6, true);
          public          postgres    false    212                       0    0    usuario_userid_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.usuario_userid_seq', 4, true);
          public          postgres    false    214            q           2606    16411    ticket ticket_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_pkey PRIMARY KEY (ticketid);
 <   ALTER TABLE ONLY public.ticket DROP CONSTRAINT ticket_pkey;
       public            postgres    false    209            s           2606    16413 "   ticketcomments ticketcomments_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.ticketcomments
    ADD CONSTRAINT ticketcomments_pkey PRIMARY KEY (ticketcommentid);
 L   ALTER TABLE ONLY public.ticketcomments DROP CONSTRAINT ticketcomments_pkey;
       public            postgres    false    211            u           2606    16415    usuario usuario_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_key;
       public            postgres    false    213            w           2606    16417    usuario usuario_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (userid);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    213               ?  x????n?0??????/?]]dQ??j?l??3??`dC???i?M&?7l?s?? 
V3^լbjѱ??P?????S?u?93?3?MK?#Σ?h}??7,޾?7V?> +????C????#??9???ih?K??u???&?D7???״??a?!???l???wp??%??	}I?	u.N??\?B??nprsy?Qwr/??8c???!n??J>-?K????ٱ5??&????o???pZ?"?VDq????ş??pVg??ݑbG??	?????b?b<?v???ٿ????7?	????/?:???c??8'y@?????oKO?a?UVI|?$X	??J?**??p?th?<?vY}?#?u?}??<X7?c??? O??=??T;g$????M?*m?P?A3?6?F??7?Hʲ?n[V         #  x?e??n?0Ek??[~??E?Wi#m36?l???}?J)?if?{?ѕD
???L(???W???#?|???p??} ?oƂ4?H1?Dn?F?J?z}?F???iL4?lD:C?G?ԇ2?|?8Q???????N?*???DXR?????)a?yMV???????ZUR???r?X?
4??g??kV?׆??#?\?F?%ѥZP??tüb?#H??γV]$3!H????{7?? t7?5N??7?2??V???H:?8=????h?`?q?a?C#?G9p??Ss?M?? ?x(         L  x?m??n?0  ?sy?<l?@a????!E?x??@?i?
O?c4??_?A0'B??qR3p???b?E?Vݔ???H?>?4*TAG??v
??p(m??(g N.9?????[}1h????Up*V??\<?@?h????|W?Ռ?P?5?????f`?h???v???4?j?I??I?3??56ҭ??_Q???`?H??NK?>H?%	!T??'ys??????d?!9?7$ؙ?}???z??? ?8퐺???y??Ս4?L`?g?f?xE???4??aj?ue???_'????_??t??ay+?)?r;Z4??/??
Ky'?]EQ? 5???     