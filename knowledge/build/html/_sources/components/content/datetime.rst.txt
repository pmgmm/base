.. index:: Date Time 

.. _datetime:

Date Time
=========

Este componente selecciona uma data ou data/hora.

.. image:: ../resources/datetime.png

Requisitos
----------
       
===================================== ===============
``/framework/components/datetime.js``                       
``/framework/components/shared.js``   :ref:`jsshared`     
===================================== ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

.. attention:: 

    | Utiliza as variáveis de sessionStorage: ``language`` e ``date_format`` (exemplos: "en_US", "d-m-y").
    | A ordem de utilização para as 2 variáveis é:

    1. Atributo no html (tag);
    #. Variável ``language`` de sessionStorage;
    #. "pt_PT".

    1. Atributo no html (tag);
    #. Variável ``date_format`` de sessionStorage;
    #. "y-m-d".

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-datetime>
        <span slot="information">texto</span>
    </fwk-datetime>

==================== ================================= =========== =================== ============================================
Atributo             Descrição                         Obrigatório Opções              Default
==================== ================================= =========== =================== ============================================
``id``               Identificador único do componente Sim (?)         
``placeholder``      Placeholer do componente          Não         
``week``             Com número de semana              Não         "true", "false"     "false" 
``time``             Com Hora                          Não         "true", "false"     "false"
``value``            Valor inicial                     Não     
``language``         Idioma                            Não         | "pt_PT", "es_ES", | Variável ``language`` de sessionStorage
                                                                   | "fr_FR", "en_US"  | ou "pt_PT" 

``format``           Formato de data                   Não         | 'y-m-d', 'd-m-y', | Variável ``date_format`` de sessionStorage
                                                                   | 'y/m/d', 'd/m/y'  | ou "y-m-d"      

``mandatory``        Selecção obrigatória              Não         "true", "false"     "false"
``disable``          Inibe componente                  Não         "true", "false"     "false" 
``hide``             Esconde componente                Não         "true", "false"     "false" 
``width``            Largura do componente             Não                             "175"
``color``            Cor base do componente            Não         "blue", "gray"      "gray" 
``tooltip-position`` Posição do tooltip                Não         "left", "right"     "right"
==================== ================================= =========== =================== ============================================

.. important:: 

    O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

    O atributo ``value``, independentemente do formato mostrado, internamente utiliza o formato **yyyy-mm-dd hh:mm**.

=============== ===================== =========== ===========
Slot            Descrição             Obrigatório Observações
=============== ===================== =========== ===========
``information`` Tooltip de informação Não         Admite html
=============== ===================== =========== ===========

----

Navegação
---------

Vista de selecção de Ano
^^^^^^^^^^^^^^^^^^^^^^^^ 
    * **click em <** : recua 1 década; 
    * **click* em >** : avança 1 década;
    * **click* no ano** : abre a vista de selecção de mês;

Vista de selecção de Mês
^^^^^^^^^^^^^^^^^^^^^^^^ 
    * **click em <** : recua 1 ano; 
    * **click* em >** : avança 1 ano;
    * **click* no ano** : abre a vista de selecção de ano;
    * **click* no mês** : abre a vista de selecção de dia.

Vista de selecção de dia
^^^^^^^^^^^^^^^^^^^^^^^^
    * **click em <** : recua 1 mês; 
    * **click* em >** : avança 1 mês;
    * **click* na mês/ano** : abre a vista de selecção de mês;
    * **click* no dia** ou **click* em "hoje"**:
        * se não permite hora/minuto actualiza componente com a selecção feita;
        * se permite hora/minuto abre a vista de selecção de hora.

Vista de selecção de hora
^^^^^^^^^^^^^^^^^^^^^^^^^
    * **click em <** : recua 1 dia; 
    * **click* em >** : avança 1 dia;
    * **click* na dia/mês/ano** : abre a vista de selecção de dia;
    * **click* na hora** : abre a vista de selecção de minuto;

Vista de selecção de minuto
^^^^^^^^^^^^^^^^^^^^^^^^^^^
    * **click em <** : recua 1 hora; 
    * **click* em >** : avança 1 hora;
    * **click* na dia/mês/ano** : abre a vista de selecção de hora;
    * **click* no minuto** : actualiza componente com a selecção feita;

----

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_datetime = FormHelper.getComponent('fwk_datetime');

Atribuir valor
^^^^^^^^^^^^^^
.. code:: Javascript

    obj_datetime.value = 'yyyy-mm-dd' / 'yyyy-mm-dd hh:mm' / '';

Ler valor
^^^^^^^^^
.. code:: Javascript

    let datetime = obj_datetime.datetime;
    let date = obj_datetime.date;
    let year = obj_datetime.year
    let month = obj_datetime.month
    let day = obj_datetime.day
    let time = obj_datetime.time
    let hour = obj_datetime.hour
    let minute = obj_datetime.minute

Atribuir / cancelar obrigatoriedade
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

   obj_datetime.mandatory = true;
   obj_datetime.mandatory = false;

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_datetime.hide = false;
    obj_datetime.hide = true;

Habilitar / inibir
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_datetime.disable = false;
    obj_datetime.disable = true;

Atribuir erro
^^^^^^^^^^^^^
.. code:: Javascript

   obj_datetime.error = true; (apenas sinalizador)
   obj_datetime.error = '???? \n ???';

Cancelar erro
^^^^^^^^^^^^^
.. code:: Javascript

    obj_datetime.error = false;

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_datetime.hide;
    let is_disable = obj_datetime.disable;
    let is_mandatory = obj_datetime.mandatory;
    let has_error = obj_datetime.error;

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.