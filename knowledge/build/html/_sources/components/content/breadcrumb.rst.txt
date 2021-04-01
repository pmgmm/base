.. index:: Bread Crumb

.. _breadcrumb:

Bread Crumb
===========

Este componente mostra e gere os "caminhos" dentro da solução.

.. image:: ../resources/breadcrumb.png

Requisitos
----------
         
======================================= ===============
``/framework/components/breadcrumb.js``
``/framework/components/shared.js``     :ref:`jsshared`     
======================================= ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

----

Html do componente (tag)
------------------------

.. note:: As páginas geradas por :ref:`phppagehelper` carregam, por defeito, um elemento ``<fwk-askbox>`` com o id="fwk_askbox".  

.. code:: html

    <fwk-breadcrumb>
        <div slot="content">[{},{},...]</div>        
    </fwk-breadcrumb>

==================== ================================= =========== =============== =======
Atributo             Descrição                         Obrigatório Opções          Default
==================== ================================= =========== =============== =======
``id``               Identificador único do componente Sim (?)        
``numbered``         Elementos numerados               Não         "false", "true" "false"     
``disable``          Inibe componente                  Não         "true", "false" "false" 
``hide``             Esconde componente                Não         "true", "false" "false" 
``color``            Cor base do componente            Não         "blue", "gray"  "gray" 
``function``         Função a executar no evento click Não     
==================== ================================= =========== =============== =======

.. important:: 

    O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

    Se o atributo ``function`` estiver definido, o *target* de cada elemento do componente será considerado um **parâmetro** para a função, caso contrário, será considerado um **Uri** de uma página da solução.

=========== ===================== =========== ==============================
Slot        Descrição             Obrigatório Observações
=========== ===================== =========== ==============================
``content`` Dados para componente Sim         :ref:`breadcrumb_content_slot`
=========== ===================== =========== ==============================

----

Função de componente
--------------------

O atributo ``function`` destina-se a definir a chamada a uma função global ou a um método de classe. Os formatos permitidos são:

======================= ==========================                                       
Função global (formato) Método de classe (formato)                             
======================= ==========================
function = "toStep"     function = "obj.totStep"                  
======================= ==========================

----

.. _breadcrumb_content_slot:

Slot content
------------

A slot ``content`` é um array de objectos. Cada objecto corresponde a um elemento do componente e tem o seguinte formato:

.. code:: Javascript

    {"value": "???", "target": "???", "disable": ???}

=========== ==================== =========== =========== =======
Atributo    Descrição            Obrigatório Opções      Default
=========== ==================== =========== =========== =======
``valor``   Texto do elemento    Sim   
``target``  Parâmetro ou ``Uri`` Sim (?)  
``disable`` Inibir elemento      Não         true, false false
=========== ==================== =========== =========== =======

.. important:: 

    O atributo ``target`` só é obrigatório se o atributo ``disable`` é ``false``.

----

Exemplos
--------

Carregamento html
^^^^^^^^^^^^^^^^^
.. code:: html

    <fwk-breadcrumb id="fwk_breadcrumb" numbered="true" color="blue">
        <div slot="content">[{"value":"HOME", "target":"/ui/home.php"},
            {"value":"ORGANIZAÇÃO", "target":"", "disable":true},
            {"value":"UTILIZADORES", "target":"/ui/admin/user/list.php"},
            {"value":"EDITAR UTILIZADOR", "target":"/ui/admin/user/record.php?id=1"}]
        </div>
    </fwk-breadcrumb>

----

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_breadcrumb = FormHelper.getComponent('fwk_breadcrumb');

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_breadcrumb.hide = false;
    obj_breadcrumb.hide = true;

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_breadcrumb.hide;

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.