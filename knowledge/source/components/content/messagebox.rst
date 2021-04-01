.. index:: Message Box 

.. _messagebox:

Message Box 
===========

Este componente mostra mensagens de cariz operacional (erro, sucesso, informação).

.. image:: ../resources/messagebox.png

Requisitos
---------- 
       
======================================= ===============
``/framework/components/messagebox.js``                      
``/framework/components/shared.js``     :ref:`jsshared`     
======================================= ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.

----

Html do componente (tag)
------------------------

.. important:: As páginas geradas por :ref:`phppagehelper` carregam, por defeito, um elemento ``<fwk-messagebox>`` com o id="**fwk_messagebox**".  

.. code:: html

    <fwk-messagebox></fwk-messagebox>

===================== ================================= =========== ============================== =======
Atributo    Descrição                                   Obrigatório Opções                         Default
===================== ================================= =========== ============================== =======
`id``                 Identificador único do componente Sim (?)      
``color-error``       Cor mensagens de erro             Não         "blue", "gray", "green", "red" "red"
``color-success``     Cor mensagens de sucesso          Não         "blue", "gray", "green", "red" "green"
``color-information`` Cor mensagens de informação       Não         "blue", "gray", "green", "red" "blue"
===================== ================================= =========== ============================== =======

.. important:: O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_messagebox = FormHelper.getComponent('fwk_messagebox');
    
Mostrar mensagem
^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_messagebox.error = 'text/html';
    obj_messagebox.success = 'text/html';
    obj_messagebox.information = 'text/html';

.. note:: A mensagem desaparece passados alguns segundos.

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.