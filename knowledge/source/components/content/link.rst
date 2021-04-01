.. index:: Link

.. _link:

Link
====

Este componente abre um endereço web numa nova tab do browser.

.. image:: ../resources/link.png

Requisitos
----------
         
=================================== =============== 
``/framework/components/link.js``
``/framework/components/shared.js`` :ref:`jsshared`     
=================================== ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-link>
        <span slot="information">texto</span>
    </fwk-link>

==================== ================================= =========== ============================== =======
Atributo             Descrição                         Obrigatório Opções                         Default
==================== ================================= =========== ============================== =======
``id``               Identificador único do componente Sim (?)        
``value``            Texto do link                     Não                         address
``address``          Endereço web                      Sim                                   
``disable``          Inibe componente                  Não         "true", "false"                "false" 
``hide``             Esconde componente                Não         "true", "false"                "false" 
``color``            Cor base do componente            Não         "blue", "green", "red", "gray" "gray" 
``tooltip-position`` Posição do tooltip                Não         "left", "right"                "right"  
==================== ================================= =========== ============================== =======

.. important:: O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

----

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_link = FormHelper.getComponent('fwk_link');

Valor (texto do link)
^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_link.value = '???';

Endereço web
^^^^^^^^^^^^
.. code:: Javascript

    obj_link.address = 'http://???';

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_link.hide = false;
    obj_link.hide = true;

Habilitar / inibir
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_link.disable = false;
    obj_link.disable = true;

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_link.hide;
    let is_disable = obj_link.disable;

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.