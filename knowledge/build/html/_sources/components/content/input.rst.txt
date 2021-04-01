.. index:: Input

.. _input:

Input
=====

Este componente recebe dados em formato de texto.

.. image:: ../resources/input.png

Requisitos
----------
       
=================================== ===============
``/framework/components/input.js``                       
``/framework/components/shared.js`` :ref:`jsshared`     
=================================== ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

.. attention:: 

    | Utiliza a variável de sessionStorage: ``date_format`` (exemplo: "d-m-y") para os tipos **datetime** e **date**.
    | A ordem de utilização é: 

    #. Atributo no html (tag);
    #. Variável ``date_format`` de sessionStorage;
    #. "y-m-d".

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-input>
        <span slot="information">texto</span>
    </fwk-input>

==================== ==================================== =========== ======================= ============================================
Atributo             Descrição                            Obrigatório Opções                  Default
==================== ==================================== =========== ======================= ============================================
``id``               Identificador único do componente    Sim (?)
``type``             Tipo de dados a introduzir e validar Não         | "text", "password", 
                                                                      | "integer", "decimal", "text"
                                                                      | "datetime", "date", 
                                                                      | "time", "email" 
``placeholder``      Placeholer do componente             Não             
``value``            Valor inicial                        Não         
``format``           Formato de data                      Não         | 'y-m-d', 'd-m-y',     | Variável ``date_format`` de sessionStorage
                                                                      | 'y/m/d', 'd/m/y'      | ou "y-m-d"      
``maxlength``        Tamanho máximo do texto              Não         "1", "2", ...           | content ou automático:
                                                                                              | datetime, date, time

``mandatory``        Conteúdo obrigatório                 Não         "true", "false"         "false"
``disable``          Inibe componente                     Não         "true", "false"         "false" 
``hide``             Esconde componente                   Não         "true", "false"         "false"     
``width``            Largura do componente                Não         "1", "2", ...           "250"
``color``            Cor base do componente               Não         "blue", "gray"          "gray"
``tooltip-position`` Posição do tooltip                   Não         "left", "right"         "right" 
==================== ==================================== =========== ======================= ============================================

.. important:: 

    O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

    O atributo ``value`` do tipo **datetime**, **date** ou **time**, independentemente do formato mostrado, internamente utilizam os formato **yyyy-mm-dd** e **hh:mm**.

==================== ======================= =========== ===========
Slot                 Descrição               Obrigatório Observações
==================== ======================= =========== ===========
``information``      Tooltip de informação   Não         Admite html
==================== ======================= =========== ===========

----

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_input = FormHelper.getComponent('fwk_input');

Atribuir valor
^^^^^^^^^^^^^^
.. code:: Javascript

    obj_input.value = '?';

Ler valor
^^^^^^^^^
.. code:: Javascript

    let value = obj_input.value;

Atribuir foco
^^^^^^^^^^^^^
.. code:: Javascript

    obj_input.focus();

Atribuir / cancelar obrigatoriedade
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

   obj_input.mandatory = true;
   obj_input.mandatory = false;

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_input.hide = false;
    obj_input.hide = true;

Habilitar / inibir
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_input.disable = false;
    obj_input.disable = true;

Atribuir erro
^^^^^^^^^^^^^
.. code:: Javascript

   obj_input.error = true; (apenas sinalizador)
   obj_input.error = '???? \n ???';

Cancelar erro
^^^^^^^^^^^^^
.. code:: Javascript

    obj_input.error = false;

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_input.hide;
    let is_disable = obj_input.disable;
    let is_mandatory = obj_input.mandatory;
    let has_error = obj_input.error;

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.